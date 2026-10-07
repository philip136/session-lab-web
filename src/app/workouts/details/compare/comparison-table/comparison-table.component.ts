import { Component, input } from '@angular/core';

import { DurationPipe } from '../../../duration.pipe';
import { WorkoutDetailsResponse } from '../../../contracts';
import { ComparisonRow } from '../comparison-row/comparison-row.component';

@Component({
  selector: 'workout-comparison-table',
  imports: [DurationPipe, ComparisonRow],
  templateUrl: './comparison-table.component.html',
  styleUrl: './comparison-table.component.css',
})
export class ComparisonTable {
  readonly current = input.required<WorkoutDetailsResponse>();
  readonly baseline = input.required<WorkoutDetailsResponse>();
}
