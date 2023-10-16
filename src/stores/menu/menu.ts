import { computed, ref } from 'vue';
import { defineStore } from 'pinia';


export const useMenuStore = defineStore('menu', () => {
    const isSideMenuOpen = ref<boolean>(false);

    return {
        isSideMenuOpen,
        getSideMenuOpen: computed(() => isSideMenuOpen.value),
        setSideMenu() {
            isSideMenuOpen.value = !isSideMenuOpen.value;
        }
    };
});
/* 
Flujo de Comunicación:

El usuario hace clic en el botón del menú en el componente.
El evento de clic activa la función toggleLeftDrawer del composable.
toggleLeftDrawer en el composable llama a setSideMenu en el store.
setSideMenu en el store cambia el valor de isSideMenuOpen.
Dado que el componente está observando isSideMenuOpen a través de la computada leftDrawerOpen, cualquier cambio en isSideMenuOpen se reflejará automáticamente en leftDrawerOpen.
El componente reacciona al cambio en leftDrawerOpen y actualiza la interfaz del usuario en consecuencia.
Espero que esta explicación te haya ayudado a entender mejor cómo se comunican estas partes entre sí. ¡Déjame saber si tienes más preguntas!
*/