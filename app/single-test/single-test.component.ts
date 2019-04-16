import { Component, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { FormBuilder, ControlGroup } from '@angular/common';

import {
    AppService, ManualTest,
    ButtonRadioDirective, FocusElement, TestTypeValueAccessor
} from '../shared/index';
import { OperatorInfoComponent } from '../operator-info/operator-info.component';
import { TestTypeComponent } from '../test-type/test-type.component';
import { UnitInfoComponent } from '../unit-info/unit-info.component';
import { LoadingContainer, LoadingPage } from '../shared/loading-container';
import { ErrorHandler } from '../error-handler/error-handler.model';

@Component({
    selector: 'single-test',
    templateUrl: 'app/single-test/single-test.component.html',
    styleUrls: [
        'app/single-test/single-test.component.css'
    ],
    directives: [
        LoadingContainer,
        OperatorInfoComponent,
        TestTypeComponent, UnitInfoComponent,
        ButtonRadioDirective, TestTypeValueAccessor, FocusElement
    ]
})

export class SingleTestComponent extends LoadingPage implements OnInit {
    public Model: ManualTest;
    public ManualTestForm: ControlGroup;
    public SaveButtonText: string;
    public HideForm: boolean;

    constructor(
        public Service: AppService,
        private _routeParams: RouteParams,
        private _formBuilder: FormBuilder
    ) {
        super(true);

        this.SaveButtonText = 'Save';
        this.HideForm = true;

        this.ManualTestForm = _formBuilder.group({
            ErrorCode: [''],
            ErrorMessage: [''],
            TestType: ['']
        });

        this.Service.Error$.subscribe(() => {
            this.Ready();
        });
    }

    ngOnInit() {
        this.Model = this.Service.ManualTest;
        let id = +this._routeParams.get('id');

        if (id) {
            this.Service.LoadUnitInfo(id).subscribe((data: ManualTest) => {
                this.Model = data;
                this.HideForm = data.Error.IsError || data.SingleTestError.IsError;

                if (data.SingleTestError.IsError) {
                    this.Service.EmitError(data.SingleTestError.Message);
                }

                this.Ready();
            });
        } else {
            this.Service.GoToDone();
        }
    }

    Save() {
        this.Service.ClearError();
        this.SaveButtonText = 'Saving...';

        this.Service.SaveTestResult().subscribe(() => {
            this.SaveButtonText = 'Saved';

            if (this.Service.IsActivityEnabled()) {
                this.Service.GoToActivity(this.Model.UnitInfo.TrackingId);
            }
            else {
                this.Service.GoToDone();
            }
        });
    }

    isFormEnabled() {
        return !this.Service.Status.IsProcessing
            && this.ManualTestForm.valid
            && this.Model.TestResult != null;
    }
}