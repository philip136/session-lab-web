import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

import { ResourceContent } from '../states/resource-view/resource-content.directive';
import { ResourceView } from '../states/resource-view/resource-view.component';
import { WorkoutAPI } from '../api';
import { WorkoutHeader } from './header/header.component';

@Component({
  selector: 'workout-details',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ResourceView,
    ResourceContent,
    WorkoutHeader,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class WorkoutDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(WorkoutAPI);

  private readonly workoutId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('workoutId')))),
    { requireSync: true },
  );

  readonly workout = rxResource({
    params: () => this.workoutId(),
    stream: ({ params }) => this.api.getWorkout(params),
  });
}
