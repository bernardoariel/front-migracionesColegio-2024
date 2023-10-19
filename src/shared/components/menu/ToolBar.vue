<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth/useAuthStore';
import { useModeDark } from '../../composable/useModeDark';

const { authData } = useAuthStore()
const { isDark, toggleDarkMode, toolbarColor } = useModeDark();

interface Props{
  title:string,
  toggleLeftDrawer: () => void;
}
defineProps<Props>()
</script>

<template>
    <q-toolbar :class="`bg-${toolbarColor}`">
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        
        <q-btn 
          flat dense round 
          :icon="isDark ? 'las la-sun' : 'las la-moon'" 
          class="q-icon-lg" 
          aria-label="Menu" 
          @click="toggleDarkMode"
          />
          <!-- <q-btn 
          flat dense round 
          icon="las la-fill-drip" 
          class="q-icon-lg" 
          aria-label="Menu" 
          @click="setToolbarColor('green')"
          /> -->
          <q-badge>{{ authData?.user.name }}</q-badge>
      </q-toolbar>
</template>
