import { Component, input } from '@angular/core';

import { HeartRateZone } from '../../../contracts';
import { ZoneRow } from '../zone-row/zone-row.component';

@Component({
  selector: 'workout-zone-list',
  imports: [ZoneRow],
  templateUrl: './zone-list.component.html',
  styleUrl: './zone-list.component.css',
})
export class ZoneList {
  readonly zones = input.required<HeartRateZone[]>();
}
