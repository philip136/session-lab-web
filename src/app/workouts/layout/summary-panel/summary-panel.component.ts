import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-panel',
  templateUrl: './summary-panel.component.html',
  styleUrl: './summary-panel.component.css',
})
export class SummaryPanel {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
}
