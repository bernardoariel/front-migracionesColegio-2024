<template>
  <q-form @submit.prevent="submitForm">
    <div class="row q-col-gutter-md">
      <div v-for="(field, index) in formConfig.fields" :key="index" :class="`col-${12 / formConfig.columns * field.columnSpan}`">
        <component 
          :is="getDynamicComponent(field.type)" 
          v-bind="getFieldProps(field)"
        />
      </div>
    </div>
    <div class="row justify-end">
      <q-btn
        v-for="(button, index) in formConfig.buttons"
        :key="index"
        :label="button.label"
        :type="button.type === 'submit' ? 'submit' : 'button'"
        :color="button.color"
        @click="handleButtonClick(button.action)"
        :disabled="isPending"
        unelevated
        class="q-ml-md"
      />
    </div>
    <div v-if="isPending">Enviando...</div>
    <div v-if="isError">Error: {{ error.message }}</div>
    <div v-if="isSuccess">¡Escribano creado con éxito!</div>
  </q-form>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useFieldRegistry from './composables/useFieldRegistry';
import { useValidation } from './composables/useValidation';
import { useFormActions } from './composables/useFormActions';
import useCreateEscribano from '../../../modules/escribanos/composables/useCreateEscribano';
import CustomInput from '../elements/CustomInput.vue';
import CustomSelect from '../elements/CustomSelect.vue';
import useUpdateEscribano from '@/modules/escribanos/composables/useUpdateEscribano';
import { useQueryClient } from '@tanstack/vue-query';

export default {
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    formDataProps: {
      type: Object,
      default: () => ({})
    },
  },
  components: {
    CustomInput,
    CustomSelect
  },
  setup(props) {
    const router= useRouter()
    const route = useRoute()
 
    /* const formData = ref(props.formDataProps ); */
    const formData = ref(props.formDataProps || getDefaultFormData());
    const formErrors = ref({});

    const { validate } = useValidation(props.formConfig, formData);
    const { actionSubmitForm, cancelForm } = useFormActions();
    const queryClient = useQueryClient();
    const { addEscribano, isPending, isError, error, isSuccess } = useCreateEscribano();
    const { updateEscribano } = useUpdateEscribano();
    
    const submitForm = async () => {

      if(route.path.includes('new')) {
        
        await  addEscribano(formData.value);
       
      } else{

        await updateEscribano(formData.value);
        
      }
      queryClient.invalidateQueries(['escribanos']);
      router.push({name:'escribanos-listado'})

    };

    const getDynamicComponent = (type) => {
      const componentsMap = {
        input: CustomInput,
        select: CustomSelect,
      };
      return componentsMap[type] || null;
    };

    const handleButtonClick = (action) => {
      console.log('action::: ', action);
      
      if (action !== 'submit') return cancelForm();
      
      submitForm();
     
    };

    const getFieldProps = (field) => ({
      modelValue: formData.value[field.model],
      label: field.label,
      filled: field.filled,
      required: field.required,
      'onUpdate:modelValue': (value) => { formData.value[field.model] = value; },
      ...(field.type === 'select' ? { options: field.options } : {}),
      ...(field.type === 'input' && field.inputType ? { type: field.inputType } : {}),
    });

    watch(() => props.formDataProps, (newVal) => {
      formData.value = newVal;
    }, { deep: true });

    return {
      formData,
      formErrors,
      isPending,
      isError,
      error,
      isSuccess,
      handleButtonClick,
      getDynamicComponent,
      submitForm,
      getFieldProps
    };
  }
}
</script>
