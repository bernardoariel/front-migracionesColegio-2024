<script lang="ts" setup>
import { useMenu } from 'src/shared/composable/useMenu';
import { useTextTransform } from 'src/shared/composable/useTextTransform';
import { useRouter } from 'vue-router';
 
  const router = useRouter()
  const { toTitleCase } = useTextTransform();
  const { toggleLeftDrawer } = useMenu();

  interface Props{
    title:string,
    caption:string,
    link:string,
    icon:string
  }
  const props = defineProps<Props>()

  const navigateTo = () => {
    
    if (props.link.startsWith('http')) {
      window.open(props.link, '_blank');
      return;
    }

    router.push({ path: `${props.link}` });
    toggleLeftDrawer();
  }
 
  </script>
  
<template>
    <q-item
  clickable

  @click.stop="navigateTo"
>
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" />
      </q-item-section>
  
      <q-item-section>
        <q-item-label>{{ toTitleCase(title) }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
  
