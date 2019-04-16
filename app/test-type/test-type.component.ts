import {Component, OnInit, Input} from '@angular/core';

import {AppService} from '../shared/services/app.service';
import {TestType} from '../shared/models/test-type.model';

@Component({
    selector: 'test-type',
    templateUrl: 'app/test-type/test-type.component.html'
})

export class TestTypeComponent implements OnInit {
    @Input() IsEnabled: boolean;
    TestType: TestType;

    constructor(
        private _service: AppService) {
    }

    ngOnInit() {
    }

    getTestTypes() {
        return this._service.GetTestTypes();
    }

    setValue(value: TestType) {
        this.TestType = value;
    }
}
