import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

import { NotificationCenterComponent } from './core/notifications/notification-center/notification-center.component';

@Component({
  selector: 'app-root',
  imports: [NgIcon, RouterLink, RouterLinkActive, RouterOutlet, NotificationCenterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
