import { Component } from '@angular/core';
import { ErrorHandler } from './error-handler.model';
import { AppService } from '../shared/services/app.service';

@Component({
    selector: 'error-handler',
    templateUrl: 'app/error-handler/error-handler.component.html'
})

export class ErrorHandlerComponent {
    public Model: ErrorHandler;

    constructor(public Service: AppService) {
        this.Model = new ErrorHandler();

        this.Service.Error$.subscribe((data: ErrorHandler) => {
            this.Model = data;
        });
    }
}