import { Routes } from '@angular/router';

import { ImportWorkout } from './workouts/import/import.component';
import { workoutRoutes } from './workouts/routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'workouts',
  },
  {
    path: 'workouts',
    children: workoutRoutes,
  },
  {
    path: 'import',
    component: ImportWorkout,
  },
  {
    path: '**',
    redirectTo: 'workouts',
  },
];
