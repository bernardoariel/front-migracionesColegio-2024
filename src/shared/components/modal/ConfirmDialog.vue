<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: String,
    message: String,
    icon: {
      type: String,
      default: 'help_outline'
    },
    showing: Boolean
  },
  emits: ['update:showing', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const showing = ref(props.showing);

    const onConfirm = () => {
      emit('confirm');
      showing.value = false; // Cierra el diálogo
    };

    const onCancel = () => {
      emit('cancel');
      showing.value = false; // Cierra el diálogo
    };

    return {
      showing,
      onConfirm,
      onCancel
    };
  }
});
</script>
<template>
    <q-dialog v-model="showing.value">
      <q-card>
        <q-card-section class="row items-center no-wrap">
          <q-icon :name="icon" size="lg" />
          <span class="q-ml-md">{{ title }}</span>
        </q-card-section>
  
        <q-card-section>
          {{ message }}
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="onCancel" />
          <q-btn flat label="OK" color="primary" @click="onConfirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
