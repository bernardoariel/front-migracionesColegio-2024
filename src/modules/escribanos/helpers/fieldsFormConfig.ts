export const formConfig = {
    columns: 6,
    fields: [
      {
        model: 'nombre',
        label: 'Nombre',
        type: 'input',
        filled: true,
        required: true,
        columnSpan: 2,
        rules: [
          function(val: any) {
            return !!val || `Este campo es requerido`;
          },
          (val: string | any[]) => val.length > 3 || 'Por favor, ingresa como minimo 3 caracteres'
        ]
      },
      {
        model: 'apellido',
        label: 'Apellido',
        type: 'input',
        filled: true,
        required: true,
        columnSpan: 2,
        rules: [
          function(val: any) {
            return !!val || `Este campo es requerido`;
          },
          (val: string | any[]) => val.length > 3 || 'Por favor, ingresa como minimo 3 caracteres'
        ]
      },
      {
        model: 'matricula',
        label: 'Nro.Registro',
        type: 'input',
        filled: true,
        required: true,
        columnSpan: 1,
        rules: [
          function(val: any) {
            return !!val || `Este campo es requerido`;
          },
          (val: number) => !isNaN(val) || 'Este campo debe ser numérico'
        ]
      },
      {
        model: 'cuil',
        label: 'Cuil',
        type: 'input',
        filled: true,
        required: true,
        columnSpan: 1,
        rules: [
          function(val: any) {
            return !!val || `Este campo es requerido`;
          },
          (val: string | any[]) => val.length > 10 &&  val.length < 12 || 'Por favor, ingresa un cuit-cuil valido'
        ]
      },
      {
        model: 'sexo',
        label: 'Sexo',
        type: 'select',
        options: ['Masculino', 'Femenino'],
        required: true,
        filled: true,
        columnSpan: 1,
        rules: [
          function(val: any) {
            return !!val || `Este campo es requerido. Elija una opcion`;
          },
          
        ]
      },
      {
        model: 'direccion',
        label: 'Direccion',
        type: 'input',
        filled: true,
        required: false,
        columnSpan: 2,
      },
      {
        model: 'telefono',
        label: 'Telefono',
        type: 'input',
        filled: true,
        columnSpan: 2,
        
      },
      {
        model: 'email',
        label: 'Email',
        type: 'input',
        inputType: 'email',
        filled: true,
        required: true,
        columnSpan: 2,
        rules: [
          function(val: any) {
            return !!val || `Este campo es requerido`;
          },
          (val: any, rules: { email: (arg0: any) => any; }) => rules.email(val) || 'Por favor, introduce una dirección de email válida'
        ]
      },
    ],
    buttons: [
     
      {
        label: 'Cancelar',
        type: 'button',
        color: 'negative',
        action: 'cancel'
      },
      {
        label: 'Guardar',
        type: 'submit',
        color: 'primary',
        action: 'submit'
      },
    ]
  };