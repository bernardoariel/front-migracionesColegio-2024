<template>
  <div class="row q-pa-md q-gutter-xl">
    <div class="col-12 col-md-2 col-lg-2">
      <q-list bordered padding class="rounded-borders text-primary">
     
        <router-link :to="{ name: 'escribanos-listado' }" class="my-custom-router-link">
          <q-item
            clickable
            v-ripple
            :active="link === 'listado'"
            @click="link = 'listado'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>Listado</q-item-section>

          </q-item>
        </router-link>

        <router-link :to="{ name: 'escribano-new' }" class="my-custom-router-link">
          <q-item
            clickable
            v-ripple
            :active="link === 'edicion'"
            @click="link = 'edicion'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="edit" class="my-custom-icon"/>
            </q-item-section>

            <q-item-section class="my-custom-icon">Edición</q-item-section>

          </q-item>

        </router-link>

        <router-link :to="{ name: 'escribano-edit', params: { id: 1 } }" class="my-custom-router-link">
          <q-item
            clickable
            v-ripple
            :active="link === 'creacion'"
            @click="link = 'creacion'"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>

            <q-item-section>Creación</q-item-section>

          </q-item>

        </router-link>  

        
      </q-list>
    </div>

    <div class="col-12 col-md-9 col-lg-9 q-card q-pa-md">
      <!-- Contenido de la tarjeta -->
      <q-card-section>
        <!-- ... Contenido de la tarjeta ... -->
        <!-- Aquí se cargará el componente de la página seleccionada -->
        <router-view></router-view>
      </q-card-section>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      link: '', // Inicializa el enlace activo
    };
  },
};
</script>
<style scoped>
.my-custom-router-link {

  text-decoration: none;
}
.my-menu-link{

  color: white;
  background: #F2C037 ;
}
</style>