import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'validation-errors',
  template:
  `<div *ngIf="showErrors" class="errors-wrapper">
      <span *ngFor="let error of validationErrorsKeys" class="text-danger">
        {{ getErrorString(error) | translate:getParams(error) }}
      </span>

      <ng-container *ngIf="apiErrors">
        <span *ngFor="let error of apiErrors[controlName]" class="text-danger">
          {{ error }}
        </span>
      </ng-container>
    </div>`,
  exportAs: 'validationErrors'
})
export class ValidationErrorsComponent implements OnInit {
  @Input()
  public reactiveForm: FormGroup;

  @Input()
  public controlName: string;

  @Input()
  public msgs: Object = {};

  @Input()
  public apiErrors: Object = {};

  public constructor(
    private translate: TranslateService
  ) { }

  public ngOnInit() { }

  /**
   * Get the translation key fot the given error.
   * @param string controlError
   */
  public getErrorString(controlError: string): string {
    return 'VALIDATION.' + controlError;
  }

  /**
   * Get the translation params based on the error control type;
   * @param string controlError
   */
  public getParams(controlError: string): any {
    const params = {};
    const errors = this.validationErrors;

    switch (controlError) {
      case 'minlength':
      case 'maxlength':
        params['requiredLength'] = errors[controlError].requiredLength;
        break;

      case 'pattern':
        params['requiredPattern'] = errors[controlError].requiredPattern;
        break;

      default:
        break;
    }

    params['value'] = this.controlValue;

    return params;
  }

  get control(): AbstractControl {
    return this.reactiveForm ? this.reactiveForm.get(this.controlName) : new FormControl();
  }

  get controlValue(): any {
    return this.control ? this.control.value : null;
  }

  get showErrors(): boolean {
    return this.hasErrors && this.areErrorsDisplayable ? true : false;
  }

  get areErrorsDisplayable(): boolean {
    return this.control.dirty || this.control.touched ? true : false;
  }

  get hasErrors(): boolean {
    return this.hasValidationErrors || this.hasApiErrors ? true : false;
  }

  get hasValidationErrors(): boolean {
    return this.control && this.control.errors === null ? false : true;
  }

  get hasApiErrors(): boolean {
    return this.apiErrors && Object.keys(this.apiErrors).length > 0 ? true : false;
  }

  get validationErrors(): any {
    return this.control ? this.control.errors : {};
  }

  get validationErrorsKeys(): Array<string> {
    return this.validationErrors ? Object.keys(this.validationErrors) : [];
  }

  get apiErrorsKeys(): Array<string> {
    return this.apiErrors ? Object.keys(this.apiErrors) : [];
  }
}
