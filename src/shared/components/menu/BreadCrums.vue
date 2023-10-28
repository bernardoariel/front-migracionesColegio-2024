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
            :icon="routeItem.icon"
            :to="routeItem.path"
            @click="handleBreadcrumbClick(routeItem)"
          />
      </template>
    </q-breadcrumbs>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { linksList } from './items-link';

const route = useRoute();
const breadcrumbsLinks = ref([]);

const buildBreadcrumbs = (list, matchedRoute) => {
  let breadcrumbs = [];
  
  try {
    for (const item of list) {
      if (item.link === matchedRoute.path) {
        breadcrumbs.push({
          label: item.title,
          icon: item.icon,
          path: item.link
        });
        break;
      }
      
      if (item.children) {
        const childBreadcrumbs = buildBreadcrumbs(item.children, matchedRoute);
        if (childBreadcrumbs.length) {
          breadcrumbs.push({
            label: item.title,
            icon: item.icon,
            path: item.link
          });
          breadcrumbs = breadcrumbs.concat(childBreadcrumbs);
          break;
        }
      }
    }
  } catch (error) {
    // Aquí manejas el error, por ejemplo, imprimiendo un mensaje en la consola.
    console.error("Error construyendo los breadcrumbs:", error);
  }
  
  return breadcrumbs;
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