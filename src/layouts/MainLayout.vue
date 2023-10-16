<script lang="ts" setup>
import { computed } from 'vue';


import { useModeDark } from 'src/shared/composable/useModeDark';
import { useMenu } from 'src/shared/composable/useMenu';

import { linksList } from '../shared/components/menu/items-link';
import SideMenu from 'src/shared/components/menu/SideMenu.vue';


const { toggleLeftDrawer, getLeftDrawerOpen } = useMenu();
const { isDark, toggleDarkMode, toolbarColor, setToolbarColor} = useModeDark();

const leftDrawerOpen = computed(getLeftDrawerOpen);

const tituloSistema = "NOTARFOR"
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
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
          {{ tituloSistema }}
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
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      
      bordered
    >
      <q-list>

        <q-item-label
          header
          :class="`bg-${toolbarColor}-2`"
          class="text-dark"
        >
          Seleccione una opción
        </q-item-label>
        
        <SideMenu
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


