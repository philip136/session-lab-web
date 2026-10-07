import { Component, input } from '@angular/core';

import { DurationPipe } from '../../../duration.pipe';
import { RestSegment } from '../../../contracts';

@Component({
  selector: 'workout-rest-segment',
  imports: [DurationPipe],
  templateUrl: './rest-segment.component.html',
  styleUrl: './rest-segment.component.css',
})
export class RestSegmentRow {
  readonly segment = input.required<RestSegment>();
  readonly number = input.required<number>();
}
