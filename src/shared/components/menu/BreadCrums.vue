<template>
  <div class="breadcrumbs-container">
    <q-breadcrumbs class="text-grey" active-color="purple" align="right">
      <template v-slot:separator>
        <q-icon
          size="1.2em"
          name="arrow_forward"
          color="purple"
        />
      </template>

      <q-breadcrumbs-el
        label="Inicio"
        icon="home"
        to="/dashboard"
      />
      <template v-for="(routeItem, index) in breadcrumbsLinks" :key="index">
        <q-breadcrumbs-el
          :label="routeItem.label"
          :icon="routeItem.icon || 'las la-question'"
          :to="{ name: routeItem.name }"
        />
      </template>
    </q-breadcrumbs>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const breadcrumbsLinks = ref([]);

const updateBreadcrumbs = async () => {

  // Utiliza una función asíncrona para esperar a que los breadcrumbs se actualicen
  await new Promise((resolve) => {
    breadcrumbsLinks.value = route.matched
      .filter((routeItem) => routeItem.meta && routeItem.meta.title)
      .map((routeItem) => {
        console.log('routeItem::: ', routeItem);
        return {
          label: routeItem.meta.title,
          icon: routeItem.meta.icon || 'default-icon',
          link: routeItem.path,
        };
      });
    resolve();
  });
};

// Usa un watcher para detectar cambios en la ruta
watch(
  () => route.fullPath,
  () => {
    updateBreadcrumbs();
  }
);

// Llama a updateBreadcrumbs al inicio
updateBreadcrumbs();
</script>


<style scoped>
.breadcrumbs-container {
 margin-top:5px;
  margin-right: 20px; /* Ajusta el margen derecho según tu preferencia */
}
</style>