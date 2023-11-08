import { FormField } from './formField';

export interface FormConfig {
    fields: FormField[];
    buttons: {
      label: string;
      type: string;
      color: string;
      action: string;
    }[];
    columns: number;
  }