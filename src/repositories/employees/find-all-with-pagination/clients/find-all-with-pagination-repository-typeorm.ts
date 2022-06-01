import { getRepository } from 'typeorm';

import { IPagination } from '../../../../utils/paginate/interfaces/pagination-interface';
import { IPaginationOptions } from '../../../../utils/paginate/interfaces/pagination-options-interface';
import { paginate } from '../../../../utils/paginate/paginate';

import { Employee } from '../../../../entities/employee-entity';

import { IFindAllEmployeesWithPaginationRepository } from '../find-all-with-pagination-repository-interface';

export class FindAllEmployeesWithPaginationRepositoryTypeORM
  implements IFindAllEmployeesWithPaginationRepository
{
  async execute(
    paginationOptions: IPaginationOptions<Employee>,
  ): Promise<IPagination<Employee>> {
    const repository = getRepository(Employee);

    return await paginate<Employee>(repository, paginationOptions, {
      sortableColumns: ['createdAt', 'updatedAt'],
    });
  }
}
