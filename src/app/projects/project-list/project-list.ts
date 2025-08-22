import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

import { ProjectService, Project } from '../services/project';
import { AuthService } from '../../auth/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../shared/services/notification';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import { ProjectFormComponent } from '../project-form/project-form';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.scss'],
})
export class ProjectListComponent {
  projects: Project[] = [];
  columns: string[] = ['id', 'name', 'company', 'actions'];
  isLoading = false;
  error = '';

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al cargar proyectos';
        this.isLoading = false;
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onAddProject(): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, { width: '400px', data: null });

    dialogRef.componentInstance.formSubmit.subscribe((newProject: Project) => {
      this.projectService.createProject(newProject).subscribe({
        next: (createdProject) => {
          this.projects = [...this.projects, createdProject];
          this.notificationService.showSuccess('Proyecto creado con éxito');
          dialogRef.close();
        },
        error: () => {
          this.notificationService.showError('Error al crear proyecto');
          dialogRef.close();
        },
      });
    });
  }

  onEditProject(project: Project): void {
    const dialogRef = this.dialog.open(ProjectFormComponent, { width: '400px', data: project });

    dialogRef.componentInstance.formSubmit.subscribe((updatedProject: Project) => {
      updatedProject.id = project.id;
      updatedProject.username = project.username;
      updatedProject.email = project.email;

      const cleanProject = {
        id: updatedProject.id,
        name: updatedProject.name,
        username: updatedProject.username,
        email: updatedProject.email,
        company: {
          name: project.company.name,
          catchPhrase: updatedProject.company.catchPhrase,
          bs: project.company.bs,
        },
      };

      if (!cleanProject.id) {
        this.projects = this.projects.map((p) => (p === project ? { ...p, ...cleanProject } : p));
        this.notificationService.showWarning('Edición aplicada localmente (ID inválido para API demo).');
        dialogRef.close();
        return;
      }

      this.projectService.updateProject(cleanProject).subscribe({
        next: (updated) => {
          this.projects = this.projects.map((p) => (p.id === updated.id ? updated : p));
          this.notificationService.showSuccess('Proyecto actualizado con éxito');
          dialogRef.close();
        },
        error: () => {
          this.projects = this.projects.map((p) => (p.id === cleanProject.id ? cleanProject : p));
          this.notificationService.showWarning('No se pudo actualizar en el backend, cambio aplicado localmente.');
          dialogRef.close();
        },
      });
    });
  }

  onDeleteProject(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { message: '¿Está seguro que desea eliminar este proyecto?' } });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.projectService.deleteProject(id).subscribe({
          next: () => {
            this.projects = this.projects.filter((p) => p.id !== id);
            this.notificationService.showSuccess('Proyecto eliminado con éxito');
            dialogRef.close();
          },
          error: () => {
            this.notificationService.showError('Error al eliminar proyecto');
            dialogRef.close();
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }
}
