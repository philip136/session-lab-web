import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { firstValueFrom } from 'rxjs';

import { ErrorState } from '../states/error-state/error-state.component';
import { PageHeader } from '../layout/page-header/page-header.component';
import { NotificationService } from '../../core/notifications/notification.service';
import { WorkoutAPI } from '../api';

type ImportStatus = 'idle' | 'uploading' | 'error';

@Component({
  selector: 'import-workout',
  imports: [NgIcon, ErrorState, PageHeader],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css',
})
export class ImportWorkout {
  private readonly api = inject(WorkoutAPI);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);

  readonly selectedFile = signal<File | null>(null);
  readonly status = signal<ImportStatus>('idle');

  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile.set(input.files?.item(0) ?? null);
    this.status.set('idle');
  }

  async upload(): Promise<void> {
    const file = this.selectedFile();
    if (file === null) return;

    this.status.set('uploading');

    try {
      const response = await firstValueFrom(this.api.importFit(file));
      this.notifications.success(
        'The FIT file was imported and the workout is ready.',
        'Workout imported',
      );
      await this.router.navigate(['/workouts', response.workoutId, 'overview']);
    } catch {
      this.status.set('error');
    }
  }
}
