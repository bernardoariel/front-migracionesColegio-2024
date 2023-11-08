export interface FormField {
    model: string;
    label: string;
    columnSpan?: number;
    type: string;
    inputType?: string;
    options?: any[];
    filled?: boolean;
    required?: boolean;
    rules?: any;
}