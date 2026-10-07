import { Component, contentChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ErrorState } from '../error-state/error-state.component';
import { LoadingState } from '../loading-state/loading-state.component';
import { ResourceContent } from './resource-content.directive';

@Component({
  selector: 'app-resource-view',
  imports: [NgTemplateOutlet, LoadingState, ErrorState],
  templateUrl: './resource-view.component.html',
  styleUrl: './resource-view.component.css',
})
export class ResourceView {
  readonly loadingText = input.required<string>();
  readonly errorText = input.required<string>();
  readonly content = contentChild.required(ResourceContent);
}
