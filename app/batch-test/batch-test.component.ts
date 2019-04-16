import { Component, OnInit, ViewChild } from '@angular/core';
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
import { TestResultType } from '../shared/index';

@Component({
    selector: 'test-batch',
    templateUrl: 'app/batch-test/batch-test.component.html',
    styleUrls: [
        'app/batch-test/batch-test.component.css'
    ],
    directives: [
        LoadingContainer,
        OperatorInfoComponent,
        TestTypeComponent, UnitInfoComponent,
        FocusElement, ButtonRadioDirective, TestTypeValueAccessor
    ]
})

export class BatchTestComponent extends LoadingPage implements OnInit {
    public Model: ManualTest;
    public ManualTestForm: ControlGroup;
    public PassButtonText: string;
    public FailButtonText: string;
    public HideForm: boolean;

    @ViewChild(FocusElement) serialNumberFocus: FocusElement;

    private _passButtonDefaultText = 'Pass';
    private _failButtonDefaultText = 'Fail';

    constructor(
        public Service: AppService,
        private _routeParams: RouteParams,
        private _formBuilder: FormBuilder
    ) {
        super(true);

        this.PassButtonText = this._passButtonDefaultText;
        this.FailButtonText = this._failButtonDefaultText;
        this.HideForm = true;

        this.ManualTestForm = _formBuilder.group({
            serialNumber: [''],
            testType: [''],
            quantity: ['']
        });

        this.Service.Error$.subscribe(() => {
            this.Setup();
        });
    }

    public Setup(): void {
        this.PassButtonText = this._passButtonDefaultText;
        this.FailButtonText = this._failButtonDefaultText;

        this.Ready();
    }

    public ngOnInit(): void {
        this.Model = this.Service.ManualTest;
        let id = +this._routeParams.get('id');

        if (id) {
            this.Service.LoadUnitInfo(id).subscribe((data: ManualTest) => {
                this.Model = data;
                this.HideForm = data.Error.IsError || data.BatchTestError.IsError;

                if (data.BatchTestError.IsError) {
                    this.Service.EmitError(data.BatchTestError.Message);
                }

                this.Ready();
            });
        } else {
            this.Service.GoToDone();
        }
    }

    public Quaantity_OnKeyUp(value: string): void {
        if (value === '') {
            this.Model.Quantity = 1;
        }
    }

    public Save(): void {
        this.Service.ClearError();

        // Hack: Give the model a second to update
        setTimeout(() => {
            if (this.Model.TestResult == TestResultType.Passed) {
                this.PassButtonText = 'Saving...';
            } else {
                this.FailButtonText = 'Saving...';
            }

            this.Service.SaveTestResult().subscribe(() => {
                // Increment the number passed or number failed
                if (this.Model.TestResult == TestResultType.Passed) {
                    this.Model.NumberPassed += +this.Model.Quantity;
                } else {
                    this.Model.NumberFailed += +this.Model.Quantity;
                }

                // If the sum of passed and failed tests
                // is the same as the inventory quantity,
                // no more batch tests are allowed
                if ((this.Model.NumberPassed + this.Model.NumberFailed)
                    == this.Model.UnitInfo.InventoryQuantity) {
                    this.Model.UnitInfo.AllowBatchTest = false;
                    this.Service.EmitError(this.Service.BatchTestLimitReached);
                    this.HideForm = true;
                }

                // Reset the serial number, the quantity and set focus to the field
                this.Model.SerialNumber = '';
                this.Model.Quantity = 1;
                this.serialNumberFocus.setFocus();

                this.PassButtonText = this._passButtonDefaultText;
                this.FailButtonText = this._failButtonDefaultText;
            });
        }, 500);
    }

    public isFormEnabled(): boolean {
        return !this.Service.Status.IsProcessing && this.ManualTestForm.valid;
    }
}