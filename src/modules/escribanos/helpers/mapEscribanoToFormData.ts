import { EscribanoFormData } from '../../../interfaces/Escribano.interface';

export function mapEscribanoToFormData(escribanoData: Partial<EscribanoFormData>): EscribanoFormData {
  const formData: EscribanoFormData = {
      nombre: '',
      apellido: '',
      matricula: '',
      cuil: '',
      sexo: 'Otro',
      direccion: '',
      telefono: '',
      email: '',
      id: undefined,
      dni:'',
      condicion_id:0
  };

  (Object.keys(formData) as Array<keyof EscribanoFormData>).forEach(key => {
      if (key in escribanoData) {
          formData[key] = escribanoData[key] ?? formData[key];
      }
  });

  return formData;
}
