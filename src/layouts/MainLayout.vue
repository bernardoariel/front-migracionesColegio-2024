<script lang="ts" setup>
import BreadCrums from 'src/shared/components/menu/BreadCrums.vue';
import NavBar from 'src/shared/components/menu/NavBar.vue';

</script>

<template>

  <q-layout view="lHh lpr lFf">

    <NavBar />

    <q-page-container>
      <!-- <BreadCrums/> -->
      <router-view />
    </q-page-container>

  </q-layout>

</template>



