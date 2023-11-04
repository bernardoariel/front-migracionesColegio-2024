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

import { useRouter } from 'vue-router';
import { getComponent } from '../elements/componentFactory';
import { ref, watch } from 'vue';
import { validateForm } from '../../../helpers/validateForm';

export default {
  setup () {
    const router = useRouter()
const testInput = ref("");
const formErrors = ref({});


const handleInput = (value) => {
  console.log("Input event:", value);
};
// ... tu configuración formConfig y otros datos ...
const formConfig = {
  columns: 4,
  fields: [
    {
      model: 'name',
      label: 'Nombre',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `El ${this.label} es requerido`;
        },
        (val) => val.length > 3 || 'Por favor, ingresa como minimo 3 caracteres'
      ]
    },
    {
      model: 'register_number',
      label: 'Nro.Registro',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `El ${this.label} es requerido`;
        },
        (val) => !isNaN(val) || 'Este campo debe ser numérico'
      ]
    },
    {
      model: 'cuil',
      label: 'Cuil',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `El ${this.label} es requerido`;
        },
        (val) => val.length > 10 &&  val.length < 12 || 'Por favor, ingresa un cuit-cuil valido'
      ]
    },
    {
      model: 'sexo',
      label: 'Sexo',
      type: 'select',
      options: ['Masculino', 'Femenino'],
      required: true,
      filled: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `El ${this.label} es requerido. Elija una opcion`;
        },
        
      ]
    },
    {
      model: 'direccion',
      label: 'Direccion',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `El ${this.label} es requerido`;
        },
        (val) => val.length > 3 || 'Por favor, ingresa como minimo 3 caracteres'
      ]
    },
    {
      model: 'telefono',
      label: 'Telefono',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `El ${this.label} es requerido`;
        },
        (val) => !isNaN(val) || 'Este campo debe ser numérico'
      ]
    },
    {
      model: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `El ${this.label} es requerido`;
        },
        (val, rules) => rules.email(val) || 'Por favor, introduce una dirección de email válida'
      ]
    },
  ],
  buttons: [
   
    {
      label: 'Cancelar',
      type: 'button',
      color: 'negative',
      action: 'cancel'
    },
    {
      label: 'Guardar',
      type: 'submit',
      color: 'primary',
      action: 'submit'
    },
  ]
};
const formData = ref({
  name: '',
  register_number: '',
  cuil: '',
  sexo: null,
  direccion: '',
  telefono: '',
  email: ''
});

const getDynamicComponent = (type) => getComponent(type)

const getFieldProps = (field) => {
  
  const commonProps = {
    modelValue: formData[field.model],
    label: field.label,
    filled: field.filled,
    required: field.required,
    rules: field.rules
  };
  switch(field.type) {
    case 'input':
      return {
        ...commonProps,
        inputType: field.inputType
      };
    case 'select':
      return {
        ...commonProps,
        options: field.options
      };
    // Puedes agregar otros tipos y sus props específicos aquí
    default:
      return {};
  }
};
const handleButtonClick = (action) => {
  switch (action) {
    case 'submit':
      submitForm();
      break;
    case 'cancel':
     router.push({ name: 'escribanos-listado' });
     break;
  }
};
const submitForm = () => {
  const validationResults = validateForm(formData.value, formConfig);
  
  formErrors.value = validationResults.errors; // Actualizamos los errores
  
  // Restablecer errores específicos si un campo ahora es válido
  for (const field in formData.value) {
    if (formData.value[field] && !validationResults.errors[field]) {
      formErrors.value[field] = null;
    }
  }

  if (validationResults.isValid) {
    console.log('Formulario válido. Datos:', formData.value);
    // Aquí puedes enviar los datos a un servidor o realizar otras acciones.
  } else {
    console.log('Errores en el formulario:', validationResults.errors);
    
    // Limpiar errores después de 5 segundos
    setTimeout(() => {
      formErrors.value = {};
    }, 5000);
  }
};

watch(formData, (newValue) => {
  console.log('formData updated:', newValue);
});
watch(testInput, (newValue, oldValue) => {
      console.log("testInput ha cambiado:", newValue, oldValue);
    });
return {
  testInput,
      handleInput,
      formConfig,
      formData,
      getDynamicComponent,
      getFieldProps,
      handleButtonClick,
      submitForm,
      formErrors
    }
  }

  
}

</script>