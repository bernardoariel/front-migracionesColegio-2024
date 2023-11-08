<template>
  <q-form @submit="submitForm">
    <div class="row q-col-gutter-md">
    
      <div v-for="(field, index) in formConfig.fields" :key="index" :class="`col-${12 / formConfig.columns * field.columnSpan}`">
        <component 
        :is="getDynamicComponent(field.type)" 
        v-bind="getFieldProps(field)"
        :key="field.model"
        @update:modelValue="value => formData[field.model] = value"
        :error-message="formErrors[field.model]"
        :error="!!formErrors[field.model]"
        />
        
      </div>
    </div>
    <div class="row justify-end">
      <q-btn
        v-for="(button, index) in formConfig.buttons"
        :key="index"
        :label="button.label"
        :type="button.type"
        :color="button.color"
        @click="handleButtonClick(button.action)"
        unelevated
        class="q-ml-md"
      />
    </div>
  </q-form>
</template>
<script>

import { ref,defineComponent , inject } from 'vue';
import { useRouter } from 'vue-router';

import { useValidation } from './composables/useValidation';
import { useFormActions } from './composables/useFormActions';

import CustomInput from '../elements/CustomInput.vue';
import CustomSelect from '../elements/CustomSelect.vue';


export default {

  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    CustomInput,
    CustomSelect
    // cualquier otro componente que uses
  },
  setup(props) {

    const router = useRouter();
    const formData = ref({
      name: '',
      register_number: '',
      cuil: '',
      sexo: null,
      direccion: '',
      telefono: '',
      email: ''
    });

    const { formErrors, validate } = useValidation(ref(props.formConfig), formData);
    const { submitForm: actionSubmitForm, cancelForm } = useFormActions();
    // Componente dinámico basado en el tipo de campo
    const getDynamicComponent = (type) => {
      const componentsMap = {
        input: CustomInput,
        select: CustomSelect,
        // otros mapeos para tus componentes
      };
      return componentsMap[type] || null; // devuelve null si el tipo no está mapeado
    };

    const submitForm = async () => {
      const isValid = validate();
      if (isValid) {
        // Aquí asumimos que la acción de submitForm es una promesa, por ejemplo, una solicitud AJAX
        await actionSubmitForm(formData.value, props.formConfig);
        // Puedes redirigir o limpiar el formulario si es necesario
        // router.push({ name: 'next-route' });
      } else {
        console.log('Errores en el formulario:', formErrors.value);
      }
    };
      // Define cómo manejar los clicks de los botones
    const handleButtonClick = (action) => {
      switch (action) {
        case 'submit':
          submitForm();
          break;
        case 'cancel':
          cancelForm();
          break;
      }
    };
    // Función para obtener las propiedades de los campos dinámicamente
    const getFieldProps = (field) => {
      const commonProps = {
        modelValue: formData.value[field.model],
        label: field.label,
        filled: field.filled,
        required: field.required,
        'onUpdate:modelValue': (value) => formData.value[field.model] = value, // Evento para actualizar el valor
        // Aquí puedes agregar más propiedades comunes si son necesarias
      };

      // Aquí manejas las propiedades específicas de cada tipo de componente
      switch (field.type) {
        case 'input':
          return {
            ...commonProps,
            // Otras propiedades específicas de los inputs, como 'type' si es necesario
            type: field.inputType || 'text', // Ejemplo de manejo de tipo de input
            rules: field.rules,
          };
        case 'select':
          return {
            ...commonProps,
            // Otras propiedades específicas de los select
            options: field.options,
            rules: field.rules,
          };
        // Agrega aquí otros casos para otros tipos de campos si es necesario
        default:
          return commonProps; // Por defecto devolvemos las propiedades comunes
      }
    };
    // ... Cualquier otra lógica de configuración ...
    return {
      formData,
      formErrors,
      handleButtonClick,
      getDynamicComponent,
      submitForm,
      getFieldProps
      // ... Cualquier otra propiedad o método que necesites exponer ...
    };
  }
}

</script>