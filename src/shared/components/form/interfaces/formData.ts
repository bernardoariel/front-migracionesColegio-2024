export type FormData = {
    name: string;
    register_number: string;
    cuil: string;
    sexo: string | null;
    direccion: string;
    telefono: string;
    email: string;
    [key: string]: string | number | null; 
  }