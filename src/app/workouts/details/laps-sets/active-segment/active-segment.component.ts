import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { DurationPipe } from '../../../duration.pipe';
import { ActiveSegment } from '../../../contracts';

@Component({
  selector: 'workout-active-segment',
  imports: [DurationPipe, TitleCasePipe],
  templateUrl: './active-segment.component.html',
  styleUrl: './active-segment.component.css',
})
export class ActiveSegmentRow {
  readonly segment = input.required<ActiveSegment>();
  readonly number = input.required<number>();
}
