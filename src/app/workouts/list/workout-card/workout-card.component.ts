import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

import { DurationPipe } from '../../duration.pipe';
import { WorkoutListItemResponse } from '../../contracts';

@Component({
  selector: 'workout-card',
  imports: [DatePipe, DurationPipe, NgIcon, RouterLink],
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css',
})
export class WorkoutCard {
  readonly workout = input.required<WorkoutListItemResponse>();
}
