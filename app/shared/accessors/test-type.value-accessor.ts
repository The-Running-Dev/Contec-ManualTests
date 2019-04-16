import {Directive, Provider, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/common';

import {TestTypeComponent} from '../../test-type/test-type.component';

const CUSTOM_VALUE_ACCESSOR =
    new Provider(NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => TestTypeValueAccessor),
        multi: true
    });

@Directive({
    selector: 'test-type',
    host: {'(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()'},
    providers: [CUSTOM_VALUE_ACCESSOR]
})

export class TestTypeValueAccessor implements ControlValueAccessor {
    onChange = (_: any) => {};
    onTouched = () => {};

    constructor(private _host: TestTypeComponent) { }

    writeValue(value: any): void {
        this._host.setValue(value);
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
