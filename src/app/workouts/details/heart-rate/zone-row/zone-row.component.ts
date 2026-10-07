import { Component, input } from '@angular/core';

import { DurationPipe } from '../../../duration.pipe';
import { HeartRateZone } from '../../../contracts';

@Component({
  selector: 'workout-zone-row',
  imports: [DurationPipe],
  templateUrl: './zone-row.component.html',
  styleUrl: './zone-row.component.css',
})
export class ZoneRow {
  readonly zone = input.required<HeartRateZone>();
}
