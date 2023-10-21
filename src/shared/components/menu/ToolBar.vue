<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth/useAuthStore';
import { useModeDark } from '../../composable/useModeDark';
import useAuth from '../../composable/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter()
const { authData } = useAuthStore()
const { isDark, toggleDarkMode, toolbarColor } = useModeDark();
const { logout:logoutAuth } = useAuth()
interface Props{
  title:string,
  toggleLeftDrawer: () => void;
}
defineProps<Props>()

const logout = async ()=>{
  
  logoutAuth()
  await router.push('/login');
}
</script>

<template>
    <q-toolbar :class="`bg-${toolbarColor}`">
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        
        <q-btn 
          flat dense round 
          :icon="isDark ? 'las la-sun' : 'las la-moon'" 
          class="q-icon-lg" 
          aria-label="Menu" 
          @click="toggleDarkMode"
          />
          <!-- <q-btn 
          flat dense round 
          icon="las la-fill-drip" 
          class="q-icon-lg" 
          aria-label="Menu" 
          @click="setToolbarColor('green')"
          /> -->
          <q-badge>{{ authData?.user.name }}</q-badge>
          <q-btn 
          flat dense unelevated 
          icon="las la-sign-out-alt" 
          class="q-icon-lg" 
          aria-label="Menu" 
          @click="logout()"
          />
      </q-toolbar>
</template>
