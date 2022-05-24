import { DataValidator } from '../../../utils/data-validator/data-validator';

import { FindAllEmployeesWithPaginationRepositoryTypeORM } from '../../../repositories/employees/find-all-with-pagination/clients/find-all-with-pagination-repository-typeorm';

import { FindAllEmployeesWithPaginationService } from './find-all-with-pagination-service';

const dataValidator = new DataValidator();
const findAllEmployeesWithPaginationRepository =
  new FindAllEmployeesWithPaginationRepositoryTypeORM();

const findAllEmployeesWithPaginationService =
  new FindAllEmployeesWithPaginationService(
    dataValidator,
    findAllEmployeesWithPaginationRepository,
  );

export { findAllEmployeesWithPaginationService };
