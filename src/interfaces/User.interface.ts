
interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    lastname: string;
    cuil: string;
    created_at: string;
    updated_at: string;
    role_id: number;
    // Otras propiedades específicas de tu modelo de usuario
  }

  export default User;