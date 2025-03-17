import { ICell } from '../../../../../../components/generic-table/table.types';
import { County, Fazenda, Province } from '../../../../../../constants/entities';
import { Entity } from '../../../../../../types';
import { IFazenda } from '../../../../../../types/fazenda';
import { formatNumberDecimal } from '../../../../../../utils';

// eslint-disable-next-line import/prefer-default-export
export const cells: ICell[] = [
  { id: Fazenda.Descricao, label: 'Fazenda', numeric: false },
  { id: Fazenda.Extension, label: 'Extensão', numeric: false },
  { id: Fazenda.Gerencia, label: 'Gerente', numeric: false },
  { id: 'province', label: 'Provincia', numeric: false },
  { id: 'county', label: 'Municipio', numeric: false },
];

export const dataModifier = (data: ReadonlyArray<Entity>) => {
  return (data as unknown as IFazenda[]).map(fazenda => {
    console.log(fazenda);
    return {
      ...fazenda,
      [Fazenda.Gerencia]: fazenda[Fazenda.Gerencia]
        ? `${fazenda[Fazenda.Gerencia]}`
        : '-',
      /*   [Fazenda.Producer]: fazenda[Fazenda.Producer]
        ? `${fazenda[Fazenda.Producer][Producer.User][User.FirstName]} ${
            fazenda[Fazenda.Producer][Producer.User][User.LastName]
          }`
        : '-', */
      [Fazenda.Extension]: fazenda[Fazenda.Extension]
        ? `${formatNumberDecimal(fazenda[Fazenda.Extension])} ha`
        : '-',
      province: fazenda[Fazenda.County]
        ? fazenda[Fazenda.County]![County.Province]![Province.Description]
        : '-',
      county: fazenda[Fazenda.County]
        ? fazenda[Fazenda.County]![County.Description]
        : '-',
    };
  });
};

export const filterFazendalabel = { producer: 'Produtor', province: 'Provincia' };
