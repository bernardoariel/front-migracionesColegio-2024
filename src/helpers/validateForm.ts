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
  // Verificar si formConfig y formConfig.fields están definidos
  if (!formConfig || !formConfig.fields) {
    console.error('formConfig or formConfig.fields is undefined');
    // Devolver un objeto ValidationResult con isValid falso y un mensaje de error genérico
    return {
      isValid: false,
      errors: { _error: 'Configuration error' }
    };
  }

  // Inicializar un registro de errores vacío y asumir que el formulario es válido
  let errors: Record<string, string> = {};
  let isValid = true;

  // Iterar a través de cada field definido en formConfig
  for (const field of formConfig.fields) {
    // Comprobar si el campo es requerido y si está vacío
    if (field.required && (formData[field.model] === undefined || formData[field.model] === '')) {
      errors[field.model] = `El campo ${field.label} es requerido.`;
      isValid = false;
    }
    // Aquí podrías agregar más validaciones según tus reglas
  }

  // Devolver el resultado de la validación
  return {
    isValid,
    errors
  };
}
