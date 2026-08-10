export const regions = [
  { id: 1, name: 'Región 1' },
  { id: 2, name: 'Región 2' },
  { id: 3, name: 'Región 3' },
  { id: 4, name: 'Región 4' },
  { id: 5, name: 'Región 5' },
  { id: 6, name: 'Región 6' },
  { id: 7, name: 'Región 7' },
]

export const staffRoles = ['Director', 'Responsable', 'Técnico']
export const professions = ['Licenciado/a', 'Arquitecto/a']

export const initialUsers = [
  {
    id: 1,
    name: 'Ramiro Mendoza',
    email: 'ramiro.mendoza@autonomias.gob.bo',
    role: 'Director',
    profession: '',
    status: 'Activo',
    regions: [],
    initials: 'RM',
  },
  {
    id: 2,
    name: 'Patricia López',
    email: 'patricia.lopez@autonomias.gob.bo',
    role: 'Responsable',
    profession: '',
    status: 'Activo',
    regions: [],
    initials: 'PL',
  },
  {
    id: 3,
    name: 'María Flores',
    email: 'maria.flores@autonomias.gob.bo',
    role: 'Técnico',
    profession: 'Arquitecta',
    status: 'Activo',
    regions: [1, 4],
    initials: 'MF',
  },
  {
    id: 4,
    name: 'Diego Mamani',
    email: 'diego.mamani@autonomias.gob.bo',
    role: 'Técnico',
    profession: 'Licenciado',
    status: 'Activo',
    regions: [2],
    initials: 'DM',
  },
  {
    id: 5,
    name: 'Laura Condori',
    email: 'laura.condori@autonomias.gob.bo',
    role: 'Técnico',
    profession: 'Arquitecta',
    status: 'Activo',
    regions: [3, 6, 7],
    initials: 'LC',
  },
]

export const permissionCatalog = [
  { key: 'view_staff', label: 'Ver funcionarios' },
  { key: 'manage_users', label: 'Administrar usuarios' },
  { key: 'assign_regions', label: 'Asignar regiones' },
  { key: 'view_all_regions', label: 'Ver todas las regiones' },
  { key: 'view_own_regions', label: 'Ver regiones asignadas' },
  { key: 'view_reports', label: 'Consultar reportes' },
]

export const initialRoles = [
  {
    id: 1,
    name: 'Director',
    description:
      'Dirige el servicio, administra funcionarios y distribuye las regiones entre los técnicos.',
    users: 1,
    icon: 'ki-crown',
    permissions: [
      'view_staff',
      'manage_users',
      'assign_regions',
      'view_all_regions',
      'view_own_regions',
      'view_reports',
    ],
  },
  {
    id: 2,
    name: 'Responsable',
    description: 'Supervisa el trabajo técnico y consulta la cobertura de las siete regiones.',
    users: 1,
    icon: 'ki-user-tick',
    permissions: ['view_staff', 'view_all_regions', 'view_own_regions', 'view_reports'],
  },
  {
    id: 3,
    name: 'Técnico',
    description:
      'Atiende una, dos o tres regiones asignadas y consulta la información de su ámbito territorial.',
    users: 3,
    icon: 'ki-briefcase',
    permissions: ['view_own_regions'],
  },
]
