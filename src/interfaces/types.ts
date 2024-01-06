export type ColumnType = {
    name: string;
    label: string;
    field: string | ((row: any) => any);
    required?: boolean;
    align?: "left" | "right" | "center";
    sortable?: boolean;
    format?: (val: any) => string;
  };

export type FormatFunction = (value: any) => string;