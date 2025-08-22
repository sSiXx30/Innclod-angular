// src/app/shared/services/notification.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000): void {
    this.snackBar.open(message, '✓', {
      duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showError(message: string, duration: number = 5000): void {
    this.snackBar.open(message, '✕', {
      duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showWarning(message: string, duration: number = 4000): void {
    this.snackBar.open(message, '⚠', {
      duration,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'ℹ', {
      duration,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  dismissAll(): void {
    this.snackBar.dismiss();
  }
}
