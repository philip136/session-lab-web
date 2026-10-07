import { Directive, inject, input, Resource, TemplateRef } from '@angular/core';

export interface ResourceContentContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[resourceData]',
})
export class ResourceContent<T> {
  // This input lets Angular infer T for `let-value` in the success template.
  readonly resourceData = input.required<Resource<T | undefined>>();
  readonly template = inject<TemplateRef<ResourceContentContext<T>>>(TemplateRef);

  static ngTemplateContextGuard<T>(
    _directive: ResourceContent<T>,
    context: unknown,
  ): context is ResourceContentContext<T> {
    return true;
  }
}
