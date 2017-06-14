# Validation Angular 2+ Module

This is a validation module for Angular 2+ apps, optimized to be used with [Hello-Angular](https://github.com/llstarscreamll/Hello-Angular). This module will help you to handle your forms validation errors very easy.

## Install

From the Hello-Angular or your project root folder:

```bash
npm i --save @ngx-translate/core
git clone https://github.com/llstarscreamll/ngx-validation.git src/app/validation
```

This module should be used as a shared module, so you need to import it on any other module since all components are exported.

## Usage

The main component should be used like this:

```html
<validation-errors
    [reactiveForm]="loginForm"
    controlName="email"
    [apiErrors]="(messages$ | async)?.errors"></validation-errors>
```

Where:

- `[reactiveForm]`, your FormGroup instance
- `controlName`, which form field errors should be handled
- `[apiErrors]`, your API validation errors

That's all, when the reactive form is invalid, dirty and touched, then the validation errors are displayed.

## Tests

This modules has some tests:

```bash
ng test
```