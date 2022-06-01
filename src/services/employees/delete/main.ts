import { DeleteEmployeeRepositoryTypeORM } from '../../../repositories/employees/delete/clients/delete-repository-typeorm';
import { FindEmployeeByIdRepositoryTypeORM } from '../../../repositories/employees/find-by-id/clients/find-by-id-repository-typeorm';

import { DeleteEmployeeService } from './delete-service';

const findEmployeeByIdRepository = new FindEmployeeByIdRepositoryTypeORM();
const deleteEmployeeRepository = new DeleteEmployeeRepositoryTypeORM();

const deleteEmployeeService = new DeleteEmployeeService(
  findEmployeeByIdRepository,
  deleteEmployeeRepository,
);

export { deleteEmployeeService };
