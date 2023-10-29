<script lang="ts" setup>
import { useModeDark } from 'src/shared/composable/useModeDark';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const { isDark } = useModeDark();
const localIsDark = ref(isDark.value);
const route = useRoute()
const activeLink = ref(route.name)

console.log("Valor inicial de isDark:", isDark.value);

watch(isDark, (newValue) => {
    localIsDark.value = newValue;
}, { deep: true });
// Mira los cambios en la propiedad `name` de la ruta
watch(() => route.name, (newVal) => {
  console.log('newVal::: ', newVal);
  activeLink.value = newVal;
});


</script>

<template>
  <div class="row q-pa-md q-gutter-xl">
    
    <div class="col-12 col-md-2 col-lg-2">
      
      <q-list bordered padding class="rounded-borders text-primary">

        <!-- Enlace a Listado -->
        <router-link :to="{ name: 'escribanos-listado' }" class="my-custom-router-link">
          <q-item clickable v-ripple :class="{ 'my-menu-link': activeLink === 'escribanos-listado' }">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>Listado</q-item-section>
          </q-item>
        </router-link>

        <!-- Enlace a Creación -->
        <router-link :to="{ name: 'escribano-new' }" class="my-custom-router-link">
          <q-item clickable v-ripple :class="{ 'my-menu-link': activeLink === 'escribano-new' }">
          
              <q-item-section avatar>
                <q-icon name="add" />
              </q-item-section>
              <q-item-section>Creación</q-item-section>
            </q-item>
        </router-link>

        <!-- Enlace a Edición -->
        <q-item class="disabled-item">
        <q-item-section avatar>
            <q-icon name="edit" />
        </q-item-section>
        <q-item-section>Edición</q-item-section>
    </q-item>

      
      </q-list>

    </div>

    <div class="col-12 col-md-9 col-lg-9 q-card q-pa-md" :class="{'q-card--dark': localIsDark}">
      <!-- Contenido de la tarjeta -->
      <q-card-section>
        
        <router-view></router-view>    
        
     
      </q-card-section>

    </div>
  </div>
</template>

<style scoped>
.my-custom-router-link {
  text-decoration: none;
  color: #2C2C2C; 
  font-weight: 500;
}

.my-menu-link {
  color: #2C2C2C!important;
  background: #F2C037 !important;
}

.disabled-item {
    cursor: not-allowed;
    opacity: 0.6;
}


</style>
