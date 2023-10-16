<script lang="ts" setup>
import { useTextTransform } from 'src/shared/composable/useTextTransform';
import { useRouter } from 'vue-router';
 
  const router = useRouter()
  const { toUpperCase, toTitleCase } = useTextTransform();
  const props = defineProps({
    title: {
        type: String,
        required: true
      },
  
      caption: {
        type: String,
        default: ''
      },
  
      link: {
        type: String,
        default: '#'
      },
  
      icon: {
        type: String,
        default: ''
      }

  })

  const navigateTo = () => {

    if (props.link.startsWith('http')) {
      window.open(props.link, '_blank');
      return;
    }
    
    router.push({ name: props.link });
    
  }

  </script>
  
<template>
    <q-item
      clickable
      tag="a"
      @click="navigateTo"
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" />
      </q-item-section>
  
      <q-item-section>
        <q-item-label>{{ toUpperCase(title) }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  
