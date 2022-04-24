import { EntityRepository, Repository } from 'typeorm';

import { IPaginationOptions } from '../utils/paginate/interfaces/pagination-options-interface';
import { paginate } from '../utils/paginate/paginate';

import { Employee } from '../entities/employee-entity';

@EntityRepository(Employee)
export class EmployeesRepository extends Repository<Employee> {
  findAllWithPagination(paginationOptions: IPaginationOptions<Employee>) {
    return paginate<Employee>(this, paginationOptions, {
      sortableColumns: ['createdAt', 'updatedAt'],
    });
  }
}
