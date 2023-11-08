// composable/useFormActions.js
import { useRouter } from 'vue-router';

import { FormData } from '../interfaces/formData';
import { FormConfig } from '../interfaces/formConfig';

export function useFormActions() {
  const router = useRouter();

  const submitForm = (formData:FormData, formConfig:FormConfig) => {
    // Lógica para manejar la sumisión del formulario
    console.log('Formulario válido. Datos:', formData);
    // Enviar datos al servidor o realizar otras acciones
  };

  const cancelForm = () => {
    router.push({ name: 'escribanos-listado' });
  };

  return { submitForm, cancelForm };
}