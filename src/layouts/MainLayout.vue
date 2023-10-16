<script lang="ts" setup>
import { ref } from 'vue';

import { linksList } from '../shared/components/menu/items-link';
import SideMenu from 'src/shared/components/menu/SideMenu.vue';

const leftDrawerOpen = ref(false)
const tituloSistema = "NOTARFOR"

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ tituloSistema }}
        </q-toolbar-title>
        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>

        <q-item-label
          header
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


