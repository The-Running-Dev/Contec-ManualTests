import { Component, OnInit, ViewChild } from '@angular/core';
import { FORM_DIRECTIVES, Control, ControlGroup, FormBuilder } from '@angular/common';

import { InputSwitch } from 'primeng/primeng';

import { AppService, FocusElement } from '../shared/index';
import { ErrorHandler, ErrorHandlerComponent } from '../error-handler/index';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls: [
        'app/dashboard/dashboard.component.css'
    ],
    directives: [
        ErrorHandlerComponent, FocusElement,
        FORM_DIRECTIVES, InputSwitch,
    ]
})

export class DashboardComponent implements OnInit {
    @ViewChild(FocusElement) TrackingIdFocus: FocusElement;

    public SearchForm: ControlGroup;

    constructor(
        public Service: AppService,
        private formBuilder: FormBuilder
    ) {
        this.SearchForm = formBuilder.group({
            TrackingId: new Control('')
        });
    }

    ngOnInit() {
        this.Service.Error$.subscribe(() => {
            setTimeout(() => {
                this.TrackingIdFocus.setFocus();
            }, 100);
        });
    }

    OnEnableDiagnostics_Changed(event: any) {
        this.Service.Setup();
        this.TrackingIdFocus.setFocus();
    }

    public IsTrackingIdValid(trackingIdControl: Control): boolean {
        return !trackingIdControl.valid && !trackingIdControl.pristine && trackingIdControl.value !== '';
    }

    public OnKeyUpEnter(trackingIdControl: Control): void {
        if (trackingIdControl.valid) {
            this.Service.GoToTests(trackingIdControl.value);
        }
    }
}