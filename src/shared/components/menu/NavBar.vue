<script lang="ts" setup>
import { computed } from 'vue';

import { useMenu } from 'src/shared/composable/useMenu';
import { useModeDark } from 'src/shared/composable/useModeDark';
import { linksList } from './items-link';

import ToolBar from './ToolBar.vue';
import SideMenu from './SideMenu.vue';

const { toggleLeftDrawer, getLeftDrawerOpen } = useMenu();
const { toolbarColor } = useModeDark();

const leftDrawerOpen = computed(getLeftDrawerOpen);

</script>

<template>

    <q-header>
      
      <ToolBar title="NOTARFOR" :toggleLeftDrawer="toggleLeftDrawer"/>

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
        
          <div class="row justify-center items-center" >
            <span class="text-weight-bold">Seleccione una opción</span>
          </div>
      
        </q-item-label>
        
        <SideMenu
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

      </q-list>

    </q-drawer>

</template>
