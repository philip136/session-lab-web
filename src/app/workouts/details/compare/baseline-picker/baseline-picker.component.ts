import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { WorkoutListItemResponse } from '../../../contracts';

@Component({
  selector: 'workout-baseline-picker',
  imports: [DatePipe],
  templateUrl: './baseline-picker.component.html',
  styleUrl: './baseline-picker.component.css',
})
export class BaselinePicker {
  readonly workouts = input.required<WorkoutListItemResponse[]>();
  readonly currentWorkoutId = input.required<number>();
  readonly selectedId = input.required<number | null>();
  readonly selectedIdChange = output<number | null>();

  select(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedIdChange.emit(value === '' ? null : Number(value));
  }
}
