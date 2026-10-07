import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

import { PageHeader } from '../layout/page-header/page-header.component';
import { ResourceContent } from '../states/resource-view/resource-content.directive';
import { ResourceView } from '../states/resource-view/resource-view.component';
import { WorkoutAPI } from '../api';
import { WorkoutCard } from './workout-card/workout-card.component';

@Component({
  selector: 'workout-list',
  imports: [NgIcon, RouterLink, PageHeader, ResourceView, ResourceContent, WorkoutCard],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class WorkoutList {
  private readonly api = inject(WorkoutAPI);

  readonly workouts = rxResource({
    stream: () => this.api.getWorkouts(),
  });
}
