import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.css',
})
export class ErrorState {
  readonly message = input.required<string>();
}
