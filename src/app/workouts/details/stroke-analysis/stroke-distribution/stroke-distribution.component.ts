import { Component, input } from '@angular/core';

import { StrokeDistributionItem } from '../../../contracts';
import { StrokeRow } from '../stroke-row/stroke-row.component';

@Component({
  selector: 'workout-stroke-distribution',
  imports: [StrokeRow],
  templateUrl: './stroke-distribution.component.html',
  styleUrl: './stroke-distribution.component.css',
})
export class StrokeDistribution {
  readonly items = input.required<StrokeDistributionItem[]>();
}
