<template>
  <q-input
    v-model="localModelValue"
    :label="label"
    :type="inputType || 'text'"
    :filled="filled"
    :required="required"
    :rules="rules"
    class="q-mb-md"
  />
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: ['modelValue', 'label', 'inputType', 'filled', 'required', 'rules'],

  setup(props, context) {
    const localModelValue = ref(props.modelValue);

    watch(localModelValue, (newValue) => {
      context.emit('update:modelValue', newValue);
    });

    return {
      localModelValue, // usamos localModelValue en lugar de modelValue para el v-model
      ...props
    };
  }
}
</script>
