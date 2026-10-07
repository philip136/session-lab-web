import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css',
})
export class Stat {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly unit = input('');
}
