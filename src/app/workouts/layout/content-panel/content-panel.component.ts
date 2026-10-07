import { Component, input } from '@angular/core';

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrl: './content-panel.component.css',
})
export class ContentPanel {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
}
