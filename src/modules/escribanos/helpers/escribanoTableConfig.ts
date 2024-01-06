import { ColumnType } from '../../../interfaces/types';

export const columns: ColumnType[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      align: 'left',
      field: (row: any) => `${row.apellido} ${row.nombre}`,
      sortable: true
    },
    { name: 'matricula', align: 'center', label: 'Nro.Registro', field: 'matricula', sortable: true },
    { name: 'cuil', label: 'Cuil', field: 'cuil', sortable: true },
    { name: 'sexo', label: 'Sexo', field: 'sexo' },
    { name: 'direccion', label: 'Direccion', field: 'direccion' },
    { name: 'telefono', label: 'Telefono', field: 'telefono' },
    { name: 'email', label: 'Email', field: 'email',sortable: true },
    {
        name: 'actions',
        label: 'Acciones',
        align: 'center',
        field: () => 'actions',  // siempre retorna 'actions' como un placeholder
        sortable: false
    }
  ];