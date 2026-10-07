import { Component, input } from '@angular/core';

import { DurationPipe } from '../../../duration.pipe';
import { Stat } from '../../../stat/stat.component';
import { WorkoutLap } from '../../../contracts';
import { ActiveSegmentRow } from '../active-segment/active-segment.component';
import { RestSegmentRow } from '../rest-segment/rest-segment.component';

@Component({
  selector: 'workout-lap-card',
  imports: [DurationPipe, Stat, ActiveSegmentRow, RestSegmentRow],
  templateUrl: './lap-card.component.html',
  styleUrl: './lap-card.component.css',
})
export class LapCard {
  readonly lap = input.required<WorkoutLap>();
  readonly number = input.required<number>();
  readonly open = input(false);
}
