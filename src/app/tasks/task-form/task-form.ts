import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../services/task';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() formSubmit = new EventEmitter<Task>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnChanges(): void {
    if (this.task) {
      this.form.patchValue({
        title: this.task.title,
        completed: this.task.completed
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    const taskData: Task = {
      id: this.task?.id || 0,
      userId: this.task?.userId || 0,
      title: formValue.title,
      completed: formValue.completed
    };

    this.formSubmit.emit(taskData);
  }
}
