import { Component, Input, NgModule } from '@angular/core';

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

@NgModule({
  imports: [],
  exports: [...VALIDATION_TESTING_COMPONENTS],
  declarations: [...VALIDATION_TESTING_COMPONENTS],
})
export class ValidationTestingModuleModule { }