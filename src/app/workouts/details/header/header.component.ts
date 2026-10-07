import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { WorkoutDetailsResponse } from '../../contracts';

@Component({
  selector: 'workout-header',
  imports: [DatePipe, TitleCasePipe, NgIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class WorkoutHeader {
  readonly workout = input.required<WorkoutDetailsResponse>();
}
