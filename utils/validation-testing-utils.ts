import { Component, Input } from '@angular/core';

@Component({
  selector: 'validation-errors',
  template: ``,
  exportAs: 'validationErrors'
})
export class ValidationErrorsComponent {
  @Input()
  public reactiveForm: any;

  @Input()
  public controlName: any;

  @Input()
  public msgs: any;

  @Input()
  public apiErrors: any;
}

export const VALIDATION_TESTING_COMPONENTS = [
    ValidationErrorsComponent
];