import { Employee } from '../../../entities/employee-entity';

import { IPagination } from '../../../utils/paginate/interfaces/pagination-interface';
import { IPaginationOptions } from '../../../utils/paginate/interfaces/pagination-options-interface';

export interface IFindAllEmployeesWithPaginationRepository {
  execute(
    paginationOptions: IPaginationOptions<Employee>,
  ): Promise<IPagination<Employee>>;
}
