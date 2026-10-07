import { Routes } from '@angular/router';

import { Compare } from './details/compare/compare.component';
import { WorkoutDetails } from './details/details.component';
import { HeartRate } from './details/heart-rate/heart-rate.component';
import { LapsSets } from './details/laps-sets/laps-sets.component';
import { Overview } from './details/overview/overview.component';
import { StrokeAnalysis } from './details/stroke-analysis/stroke-analysis.component';
import { WorkoutList } from './list/list.component';

export const workoutRoutes: Routes = [
  {
    path: '',
    component: WorkoutList,
  },
  {
    path: ':workoutId',
    component: WorkoutDetails,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: Overview,
      },
      {
        path: 'laps-sets',
        component: LapsSets,
      },
      {
        path: 'stroke-analysis',
        component: StrokeAnalysis,
      },
      {
        path: 'hr-zones',
        component: HeartRate,
      },
      {
        path: 'compare',
        component: Compare,
      },
    ],
  },
];
