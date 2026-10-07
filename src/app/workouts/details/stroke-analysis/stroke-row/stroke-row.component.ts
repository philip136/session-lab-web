import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { StrokeDistributionItem } from '../../../contracts';

@Component({
  selector: 'workout-stroke-row',
  imports: [TitleCasePipe],
  templateUrl: './stroke-row.component.html',
  styleUrl: './stroke-row.component.css',
})
export class StrokeRow {
  readonly item = input.required<StrokeDistributionItem>();
}
