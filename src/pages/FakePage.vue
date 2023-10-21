<script lang="ts" setup>


console.log('FakeComponent')
</script>

<template>
  <q-page class="row items-center justify-evenly">
    
    <h2>Component:FakeComponent</h2>
    <h1>{{ $route.meta.title }}</h1>
    <router-view></router-view>
   
  </q-page>
</template>

