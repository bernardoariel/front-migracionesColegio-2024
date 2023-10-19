<script lang="ts" setup>
import useAuth from 'src/shared/composable/useAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const { login } = useAuth();
const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const onSubmit = async () => {
  try {
    const form = {
      email: email.value,
      password: password.value,
    };

    const result = await login(form);

    if (result.success) {
      router.push('/'); // Redirige a la página deseada después del inicio de sesión
    } else {
      // Muestra errores si es necesario
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    // Muestra errores si hay un problema en la solicitud
  }
};


</script>

<template>
  <div class="centered-container">
    <q-card class="my-card bg-dark text-white">
      <span class="text-h4 login-title">Login</span>
      <q-card-section>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            filled
            dark
            v-model="email"
            label="Correo electrónico *"
            hint="ejemplo@dominio.com"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Por favor, ingrese un correo electrónico',
              val => (val && /.+@.+\..+/.test(val)) || 'Por favor, ingrese un correo válido'
            ]"
          />

          <q-input
            filled
            dark
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            label="Contraseña *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Por favor, ingrese una contraseña']">
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>

          <div class="text-right">
            <q-btn unelevated label="Enviar" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="sass" scoped>
.centered-container
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  width: 100%
  background-image: url('/images/background.jpg')
  background-size: cover
  background-position: center
  background-repeat: no-repeat

.my-card
  max-width: 450px
  width: 100%
  background-color: rgba(255, 255, 255, 0.5)

.login-title
  display: block
  width: 100%
  margin-top: 20px  // Ajusta este valor según la separación que desees desde el top
  text-align: center
</style>
