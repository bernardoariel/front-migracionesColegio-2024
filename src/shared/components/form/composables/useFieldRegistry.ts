// Definir la estructura esperada para un solo campo de formulario
interface FormFieldConfig {
    model: string;
    value?: string;
    // Agrega otras propiedades conocidas de tus campos aquí
  }
  
  // Definir la estructura completa de la configuración del formulario
  interface FormConfig {
    fields: FormFieldConfig[];
    // Agrega otras propiedades conocidas de tu configuración de formulario aquí
  }
  
  // Tipo para los datos del formulario, asumiendo que solo contiene strings
  // Puedes ampliar esto si necesitas manejar diferentes tipos de datos
  type FormData = Record<string, string>;
  
  export default function useFieldRegistry(formConfig: FormConfig) {
      const initializeFormData = (formData: FormData) => {
        // Inicializar formData basado en la configuración del formulario
        formConfig.fields.forEach((field: FormFieldConfig) => {
          formData[field.model] = field.value || '';
        });
      };
    
      return {
        initializeFormData
      };
  }
  