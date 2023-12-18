// componibles/useValidation.ts
import { Ref, ref } from 'vue';
import { validateForm } from '@/helpers/validateForm';

import { FormConfig } from '../interfaces/formConfig';
import { FormData } from '../interfaces/formData';

export function useValidation(formConfig: Ref<FormConfig>, formData: Ref<FormData>) {
  
  const formErrors = ref<Record<string, string | null>>({});

  const validate = () => {
    // Asegúrate de que estás accediendo al objeto interno .value de las refs
   /*  console.log('Validating with formConfig:', formConfig.value);
     */
    console.log('formConfig or formData is undefined');
    console.log('formConfig::: ', formConfig);
    console.log('And formData:', formData);
    if (!formConfig || !formData) {
      console.error('formConfig or formData is undefined');
      return false;
    }
    const results = validateForm(formData.value, formConfig.value);
    formErrors.value = results.errors;
    
    for (const field in formData.value) {
      // Asigna null a la propiedad específica del error si el campo está presente y no hay errores.
      if (formData.value[field] && !results.errors[field]) {
        formErrors.value[field] = null;
      }
    }

    return results.isValid;
  };

  return { formErrors, validate };
}
