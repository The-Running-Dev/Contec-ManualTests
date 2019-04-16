import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {UnitInfo} from '../shared/index';
import {DateTimeFormat} from '../shared/pipes/date-time-format.pipe';
import {AppService} from '../shared/services/app.service';

@Component({
    selector: 'unit-info',
    templateUrl: 'app/unit-info/unit-info.component.html',
    styleUrls: ['app/unit-info/unit-info.component.css'],
    pipes: [DateTimeFormat]
})

export class UnitInfoComponent implements OnChanges {
    @Input() unitInfo: UnitInfo;
    Model: UnitInfo;

    constructor (
        public Service: AppService
    ) {

    }

    // Subscribe to the change event and update the model
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        let key = 'unitInfo';

        this.Model = changes[key].currentValue;
    }
}