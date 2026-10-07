import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'workout-metric',
  imports: [NgIcon],
  templateUrl: './metric.component.html',
  styleUrl: './metric.component.css',
})
export class WorkoutMetric {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly unit = input.required<string>();
}
