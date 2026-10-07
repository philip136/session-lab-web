import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';

import { PageHeader } from '../../layout/page-header/page-header.component';
import { WorkoutDetailsResponse } from '../../contracts';
import { LapCard } from './lap-card/lap-card.component';

@Component({
  selector: 'workout-laps-sets',
  imports: [PageHeader, LapCard],
  templateUrl: './laps-sets.component.html',
  styleUrl: './laps-sets.component.css',
})
export class LapsSets {
  readonly workout = inject(ROUTER_OUTLET_DATA) as Signal<WorkoutDetailsResponse>;
}
