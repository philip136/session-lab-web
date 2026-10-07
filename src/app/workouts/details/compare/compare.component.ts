import { Component, inject, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ROUTER_OUTLET_DATA } from '@angular/router';

import { PageHeader } from '../../layout/page-header/page-header.component';
import { ResourceContent } from '../../states/resource-view/resource-content.directive';
import { ResourceView } from '../../states/resource-view/resource-view.component';
import { WorkoutAPI } from '../../api';
import { WorkoutDetailsResponse } from '../../contracts';
import { BaselinePicker } from './baseline-picker/baseline-picker.component';
import { ComparisonTable } from './comparison-table/comparison-table.component';

@Component({
  selector: 'workout-compare',
  imports: [PageHeader, ResourceView, ResourceContent, BaselinePicker, ComparisonTable],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css',
})
export class Compare {
  private readonly api = inject(WorkoutAPI);

  readonly workout = inject(ROUTER_OUTLET_DATA) as Signal<WorkoutDetailsResponse>;
  readonly baselineId = signal<number | null>(null);

  readonly workouts = rxResource({
    stream: () => this.api.getWorkouts(),
  });

  readonly baseline = rxResource({
    params: () => this.baselineId() ?? undefined,
    stream: ({ params }) => this.api.getWorkout(params),
  });
}
