<script lang="ts" setup>
import NavBar from 'src/shared/components/menu/NavBar.vue';



</script>

<template>
  <q-layout view="lHh Lpr lFf">
   
    <NavBar />
   
    <q-page-container>

      <router-view />

    </q-page-container>

  </q-layout>

</template>


