import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  templateUrl: './loading-state.component.html',
  styleUrl: './loading-state.component.css',
})
export class LoadingState {
  readonly message = input.required<string>();
}
