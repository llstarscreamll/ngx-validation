import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { ES } from 'app/validation/translations/es';
import { EN } from 'app/validation/translations/en';
import { ValidationErrorsComponent } from 'app/validation/components/validation-errors.component';

const COMPONENTS = [
  ValidationErrorsComponent
];

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ValidationSharedModule {

  public constructor(translate: TranslateService) {
    translate.setTranslation('es', ES, true);
    translate.setTranslation('en', EN, true);
  }

}
