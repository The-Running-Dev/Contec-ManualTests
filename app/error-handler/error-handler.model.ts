export class ErrorHandler {
    public IsError: boolean;

    public Message: string;

    public AllowNavigation: boolean;

    constructor(isError?: boolean, message?: string) {
        this.IsError = isError;
        this.Message = message;
    }
}