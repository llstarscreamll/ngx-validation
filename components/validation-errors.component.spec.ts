/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ES } from './../translations/es';
import { ValidationErrorsComponent } from './validation-errors.component';

/**
 * ValidationErrorsComponent Tests.
 *
 * @author  [name] <[<email address>]>
 */
describe('ValidationErrorsComponent', () => {
  let fixture: ComponentFixture<ValidationErrorsComponent>;
  let component: ValidationErrorsComponent;
  let reactiveForm;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidationErrorsComponent],
      imports: [CommonModule, TranslateModule.forRoot()],
      providers: [TranslateService]
    }).compileComponents();

    fixture = getTestBed().createComponent(ValidationErrorsComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(inject([TranslateService], (translateService: TranslateService) => {
    translateService.setTranslation('es', ES, true);
    translateService.setDefaultLang('es');
    translateService.use('es');
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should NOT SHOW errors if field is pristine and untouched', () => {
    const group = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    component.reactiveForm = group;
    component.controlName = 'name';
    fixture.detectChanges();

    // control is invalid and has errors
    expect(component.control.valid).toBe(false);
    expect(component.control.errors).not.toBeNull();
    // but should not shown the errors beacause field is pristine and untouched
    expect(component.control.pristine).toBe(true);
    expect(component.control.untouched).toBe(true);
    expect(component.showErrors).toBe(false);
    expect(fixture.nativeElement.textContent).not.toContain('Este campo es obligatorio.');
  });

  it('should show default flat messages', () => {
    const group = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    component.reactiveForm = group;
    component.controlName = 'name';
    component.reactiveForm.get('name').markAsDirty();
    component.reactiveForm.get('name').markAsTouched();
    fixture.detectChanges();

    expect(component.control).toBeDefined();
    expect(component.control.valid).toBe(false);
    expect(component.control.errors).not.toBeNull();
    expect(component.validationErrorsKeys).toContain('required');
    expect(component.areErrorsDisplayable).toBe(true, 'errors are displayable');
    expect(component.hasErrors).toBe(true, 'the field has errors');
    expect(component.showErrors).toBe(true, 'showErrors = true');
    expect(fixture.nativeElement.textContent).toContain('Este campo es obligatorio.');
  });

  it('should show default messages with certain params', () => {
    const group = new FormGroup({
      name: new FormControl('a', [Validators.minLength(2)]),
    });

    component.reactiveForm = group;
    component.controlName = 'name';
    component.reactiveForm.get('name').markAsDirty();
    component.reactiveForm.get('name').markAsTouched();
    fixture.detectChanges();

    expect(component.control).toBeDefined();
    expect(component.control.valid).toBe(false);
    expect(component.showErrors).toBe(true);

    // for minlength validation, requiredLength param should be deduced to be passed to the translate pipe
    expect(component.validationErrorsKeys).toContain('minlength');
    expect(component.getParams('minlength')).toEqual({'requiredLength': 2, 'value': 'a'});

    // should see message with the Validatior.minLength param
    expect(fixture.nativeElement.textContent).toContain('Mínimo 2 caracteres.');
  });

  it('should show apiErrors if any', () => {
    const group = new FormGroup({
      name: new FormControl('a')
    });

    component.reactiveForm = group;
    component.controlName = 'name';
    const msg = 'this name is already taken!!';

    component.apiErrors = {
      name: [msg]
    };

    component.reactiveForm.get('name').markAsDirty();
    component.reactiveForm.get('name').markAsTouched();
    fixture.detectChanges();

    expect(component.control).toBeDefined();
    expect(component.control.valid).toBe(true);
    expect(component.showErrors).toBe(true);
    expect(component.apiErrorsKeys).toMatch('name');
    expect(fixture.nativeElement.textContent).toContain(msg);
  });
});
