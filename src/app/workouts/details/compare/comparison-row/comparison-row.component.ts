import { Component, input } from '@angular/core';

@Component({
  selector: 'workout-comparison-row',
  templateUrl: './comparison-row.component.html',
  styleUrl: './comparison-row.component.css',
})
export class ComparisonRow {
  readonly label = input.required<string>();
  readonly current = input.required<string | number>();
  readonly baseline = input.required<string | number>();
  readonly unit = input('');
}
