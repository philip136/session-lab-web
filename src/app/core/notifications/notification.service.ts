import { computed, Injectable, signal } from '@angular/core';

export type NotificationKind = 'error' | 'warning' | 'success' | 'info';

export interface AppNotification {
  id: number;
  kind: NotificationKind;
  title: string;
  message: string;
  createdAt: Date;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 1;
  private readonly state = signal<AppNotification[]>([]);

  readonly notifications = this.state.asReadonly();
  readonly unreadCount = computed(() => this.state().filter((item) => !item.read).length);
  readonly latest = computed<AppNotification | null>(() => this.state()[0] ?? null);

  error(message: string, title = 'Request failed'): void {
    this.add('error', title, message);
  }

  warning(message: string, title = 'Warning'): void {
    this.add('warning', title, message);
  }

  success(message: string, title = 'Completed'): void {
    this.add('success', title, message);
  }

  info(message: string, title = 'Info'): void {
    this.add('info', title, message);
  }

  markAllRead(): void {
    this.state.update((items) => items.map((item) => ({ ...item, read: true })));
  }

  remove(id: number): void {
    this.state.update((items) => items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.state.set([]);
  }

  private add(kind: NotificationKind, title: string, message: string): void {
    const notification: AppNotification = {
      id: this.nextId++,
      kind,
      title,
      message,
      createdAt: new Date(),
      read: false,
    };

    this.state.update((items) => [notification, ...items].slice(0, 30));
  }
}
