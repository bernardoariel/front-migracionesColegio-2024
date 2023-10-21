
import useAuth from '../shared/composable/useAuth';


export const authGuard = async (to: any, from: any, next: any)  => {

  const token = localStorage.getItem('token');
  const { regenerateToken } = useAuth();

  if (to.path === '/login') return next();
  if (!token) return next('/login');

  // Intenta regenerar el token antes de continuar la navegación
  try {
    await regenerateToken();

    // Continúa con la navegación si la regeneración del token es exitosa
    next();
  } catch (error) {
    console.error('Error al regenerar el token:', error);

    // Aquí no cerramos la sesión automáticamente, pero puedes hacerlo si lo deseas.
    // Para cerrar sesión solo si la regeneración falla, puedes agregar el código de cierre de sesión aquí.
    next();
  }
};
