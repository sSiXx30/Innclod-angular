import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../services/project';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './project-form.html',
  styleUrls: ['./project-form.scss']
})
export class ProjectFormComponent implements OnChanges {
  @Input() project: Project | null = null;
  @Output() formSubmit = new EventEmitter<Project>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      companyCatchPhrase: ['']
    });
  }

  ngOnChanges(): void {
    if (this.project) {
      this.form.patchValue({
        name: this.project.name,
        companyCatchPhrase: this.project.company?.catchPhrase || ''
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value;
    const projectData: Project = {
      id: this.project?.id || 0,
      name: formValue.name,
      username: this.project?.username || '',
      email: this.project?.email || '',
      company: {
        name: this.project?.company?.name || '',
        catchPhrase: formValue.companyCatchPhrase,
        bs: this.project?.company?.bs || ''
      }
    };
    this.formSubmit.emit(projectData);
  }
}
