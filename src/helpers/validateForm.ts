interface FieldConfig {
  model: string;
  label: string;
  required?: boolean;
  // ... Otros atributos del field que puedas necesitar ...
}

interface FormConfig {
  fields: FieldConfig[];
  // ... Otros atributos del formConfig que puedas necesitar ...
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateForm(formData: Record<string, any>, formConfig: FormConfig): ValidationResult {
  let errors: Record<string, string> = {};
  let isValid = true;

  formConfig.fields.forEach(field => {
    if (field.required && !formData[field.model]) {
      errors[field.model] = `El ${field.label} es requerido`;
      isValid = false;
    }

    // Aquí puedes agregar más validaciones según tus reglas
  });

  return {
    isValid,
    errors
  };
}
