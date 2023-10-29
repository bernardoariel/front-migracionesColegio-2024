<template>
    <q-input
      :value="modelValue"
      :label="label"
      :type="inputType || 'text'"
      :filled="filled"
      :required="required"
      :rules="rules"
      class="q-mb-md"
      @input="value => emit('update:modelValue', value)"
    />
  </template>
  
  <script setup>

  
  const {
    modelValue,
    label,
    inputType,
    filled,
    required,
    rules,
  } = defineProps(['modelValue', 'label', 'inputType', 'filled', 'required', 'rules']);
  
  const emit = defineEmits(['update:modelValue']);
  </script>