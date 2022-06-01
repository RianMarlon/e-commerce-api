import { ILike } from 'typeorm';

import { IWhere } from '../../../utils/where/interfaces/where.interface';
import { Where } from '../../../utils/where/where';

import { Employee } from '../../../entities/employee-entity';

import { FilterParamsEmployeesDTO } from './dto/filter-params-dto';

export class SearchEmployees {
  where: IWhere<Employee> = new Where<Employee>();

  constructor(filterParams: FilterParamsEmployeesDTO) {
    if (filterParams.search) {
      const { search } = filterParams;

      this.where.orConditions([
        {
          name: ILike(`${search}`),
          email: search,
        },
      ]);
    }
  }
}
