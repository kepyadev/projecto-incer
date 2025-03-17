export const getSelectedPermitions = (
  permitionsIn: Record<string, string>[],
  data: Record<string, any>
): string[] => {
  const filteredPermitions = permitionsIn.filter(permition => {
    const permitionKeys = Object.keys(permition)[0];
    return data.permition[`${permitionKeys.slice(1)}`];
  });

  return filteredPermitions.map(permition => {
    const permitionKeys = Object.keys(permition)[0];

    return permitionKeys;
  });
};

export const permitions: Record<string, string>[] = [
  { '/fazendas': 'Fazendas' },
  { '/cultures': 'Culturas' },
  { '/equipamentos': 'Equipamentos' },
  { '/meio-estacionario': 'Meios Estacionários' },
  { '/machine': 'Máquinas' },
  { '/animal': 'Animais' },
  { '/infraestrutura': 'Infraestruturas' },
  { '/human-resource': 'Recursos Humanos' },
];
