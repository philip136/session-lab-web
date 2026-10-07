import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-center',
  imports: [DatePipe, NgIcon],
  templateUrl: './notification-center.component.html',
  styleUrl: './notification-center.component.css',
})
export class NotificationCenterComponent {
  readonly notifications = inject(NotificationService);
  readonly open = signal(false);
  readonly dismissedToastId = signal<number | null>(null);

  readonly visibleToast = computed(() => {
    const latest = this.notifications.latest();
    return latest !== null && !latest.read && latest.id !== this.dismissedToastId() ? latest : null;
  });

  toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (next) this.notifications.markAllRead();
  }

  closeToast(id: number): void {
    this.dismissedToastId.set(id);
  }
}
