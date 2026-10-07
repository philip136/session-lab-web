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
import { StrokeDistribution } from './stroke-distribution/stroke-distribution.component';

@Component({
  selector: 'workout-stroke-analysis',
  imports: [
    ContentPanel,
    PageHeader,
    ResourceView,
    ResourceContent,
    WorkoutMetric,
    StrokeDistribution,
  ],
  templateUrl: './stroke-analysis.component.html',
  styleUrl: './stroke-analysis.component.css',
})
export class StrokeAnalysis {
  private readonly api = inject(WorkoutAPI);

  readonly workout = inject(ROUTER_OUTLET_DATA) as Signal<WorkoutDetailsResponse>;
  readonly analysis = rxResource({
    params: () => this.workout().id,
    stream: ({ params }) => this.api.getStrokeAnalysis(params),
  });
}
