import {Directive, Renderer, Provider, ElementRef, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/common';

const RADIO_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => RadioControlValueAccessor), multi: true});
/*
https://github.com/angular2-school/angular2-radio-button
*/
@Directive({
    selector: 'input[type=radio][ngControl],input[type=radio][ngFormControl],input[type=radio][ngModel]',
    host: {'(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()'},
    bindings: [RADIO_VALUE_ACCESSOR]
})

export class RadioControlValueAccessor implements ControlValueAccessor {
    onChange = (_: any) => {};
    onTouched = () => {};

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) {}

    writeValue(value: any): void {
        this._renderer.setElementProperty(
            this._elementRef.nativeElement, 'checked', value == this._elementRef.nativeElement.value);
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
