
interface Escribano {
    id?: number;
    nombre: string;
    apellido: string;
    matricula: string;
    dni: string;
    cuil: string;
    sexo: 'Masculino' | 'Femenino' | 'Otro';
    direccion: string;
    telefono: string;
    email: string;
    condicion_id:number;
    lastname: string;
    user_id?:number
}
export default Escribano;

export type EscribanoFormData = {
  nombre: string;
  apellido: string;
  matricula: string;
  cuil: string;
  sexo: string;
  direccion: string;
  telefono: string;
  email: string;
  id?: number;
  dni: string;
  condicion_id:number;
};