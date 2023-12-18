<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import TemplateForm from 'src/shared/components/form/TemplateForm.vue';
import useEscribano from '../composables/useEscribano';
import { formConfig } from '../helpers/fieldsFormConfig';
import { mapEscribanoToFormData } from '../helpers/mapEscribanoToFormData';

const route = useRoute()
const { escribano:escribanoData, isLoading, refetchEscribano  } = useEscribano( +route.params.id )

const formData = ref(mapEscribanoToFormData({}));

watch(escribanoData, (newData) => {
  if (newData) {
    formData.value = mapEscribanoToFormData(newData);
  }
}, { immediate: true });

</script>

<template>
    <h1 v-if="isLoading">Cargando</h1>
    <TemplateForm v-else :formConfig="formConfig" :formDataProps="formData" @submit="refetchEscribano"/>
</template>
