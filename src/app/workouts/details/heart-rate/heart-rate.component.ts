import { Component, inject, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ROUTER_OUTLET_DATA } from '@angular/router';

import { ContentPanel } from '../../layout/content-panel/content-panel.component';
import { PageHeader } from '../../layout/page-header/page-header.component';
import { ResourceContent } from '../../states/resource-view/resource-content.directive';
import { ResourceView } from '../../states/resource-view/resource-view.component';
import { WorkoutAPI } from '../../api';
import { WorkoutDetailsResponse } from '../../contracts';
import { WorkoutMetric } from '../overview/metric/metric.component';
import { ZoneList } from './zone-list/zone-list.component';

@Component({
  selector: 'workout-heart-rate',
  imports: [ContentPanel, PageHeader, ResourceView, ResourceContent, WorkoutMetric, ZoneList],
  templateUrl: './heart-rate.component.html',
  styleUrl: './heart-rate.component.css',
})
export class HeartRate {
  private readonly api = inject(WorkoutAPI);

  readonly workout = inject(ROUTER_OUTLET_DATA) as Signal<WorkoutDetailsResponse>;
  readonly zones = rxResource({
    params: () => this.workout().id,
    stream: ({ params }) => this.api.getHeartRateZones(params),
  });
}
