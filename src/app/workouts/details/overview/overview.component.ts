import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';

import { DurationPipe } from '../../duration.pipe';
import { Stat } from '../../stat/stat.component';
import { SummaryPanel } from '../../layout/summary-panel/summary-panel.component';
import { WorkoutDetailsResponse } from '../../contracts';
import { WorkoutMetric } from './metric/metric.component';

@Component({
  selector: 'workout-overview',
  imports: [DurationPipe, Stat, SummaryPanel, WorkoutMetric],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class Overview {
  readonly workout = inject(ROUTER_OUTLET_DATA) as Signal<WorkoutDetailsResponse>;
}
