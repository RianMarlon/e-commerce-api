import { FindEmployeeByIdRepositoryTypeORM } from '../../../repositories/employees/find-by-id/clients/find-by-id-repository-typeorm';

import { FindEmployeeByIdService } from './find-by-id-service';

const findEmployeeByIdRepository = new FindEmployeeByIdRepositoryTypeORM();

const findEmployeeByIdService = new FindEmployeeByIdService(
  findEmployeeByIdRepository,
);

export { findEmployeeByIdService };
