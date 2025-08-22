import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../services/task';
import { AuthService } from '../../auth/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../shared/services/notification';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';
import { TaskFormComponent } from '../task-form/task-form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss'],
})
export class TaskListComponent {
  tasks: Task[] = [];
  isLoading = false;
  error = '';
  projectId = 0;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(
      this.route.snapshot.paramMap.get('id') || this.route.snapshot.paramMap.get('projectId')
    );
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasksByProject(this.projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Error al cargar tareas';
        this.isLoading = false;
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onAddTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, { width: '400px', data: null });

    dialogRef.componentInstance.formSubmit.subscribe((newTask: Task) => {
      newTask.userId = this.projectId;
      this.taskService.createTask(newTask).subscribe({
        next: (createdTask) => {
          this.tasks = [...this.tasks, createdTask];
          this.notificationService.showSuccess('Tarea creada con éxito');
          dialogRef.close();
        },
        error: () => {
          this.notificationService.showError('Error al crear tarea');
          dialogRef.close();
        },
      });
    });
  }

  onEditTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, { width: '400px', data: task });

    dialogRef.componentInstance.formSubmit.subscribe((updatedTask: Task) => {
      updatedTask.id = task.id;
      updatedTask.userId = task.userId;

      const cleanTask = {
        id: updatedTask.id,
        userId: updatedTask.userId,
        title: updatedTask.title,
        completed: updatedTask.completed,
      };

      if (!cleanTask.id || !cleanTask.userId) {
        this.tasks = this.tasks.map(t => (t === task ? { ...t, ...cleanTask } : t));
        this.notificationService.showWarning('Edición aplicada localmente (ID inválido para API demo).');
        dialogRef.close();
        return;
      }

      this.taskService.updateTask(cleanTask).subscribe({
        next: (updated) => {
          this.tasks = this.tasks.map(t => (t.id === updated.id ? updated : t));
          this.notificationService.showSuccess('Tarea actualizada con éxito');
          dialogRef.close();
        },
        error: () => {
          this.tasks = this.tasks.map(t => (t.id === cleanTask.id ? cleanTask : t));
          this.notificationService.showWarning('Error en backend, cambio aplicado localmente.');
          dialogRef.close();
        },
      });
    });
  }

  onDeleteTask(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { message: '¿Está seguro que desea eliminar esta tarea?' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.notificationService.showSuccess('Tarea eliminada con éxito');
            dialogRef.close();
          },
          error: () => {
            this.notificationService.showError('Error al eliminar tarea');
            dialogRef.close();
          },
        });
      } else {
        dialogRef.close();
      }
    });
  }
}
