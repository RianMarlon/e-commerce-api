import { DataValidator } from '../../../utils/data-validator/data-validator';

import { CreateEmployeeRepositoryTypeORM } from '../../../repositories/employees/create/clients/create-repository-typeorm';
import { FindEmployeeByCPFRepositoryTypeORM } from '../../../repositories/employees/find-by-cpf/clients/find-by-cpf-repository-typeorm';
import { FindEmployeeByEmailRepositoryTypeORM } from '../../../repositories/employees/find-by-email/clients/find-by-email-repository-typeorm';

import { CreateEmployeeService } from './create-service';

const dataValidator = new DataValidator();
const findEmployeeByEmailRepository =
  new FindEmployeeByEmailRepositoryTypeORM();
const findEmployeeByCPFRepository = new FindEmployeeByCPFRepositoryTypeORM();
const createEmployeeRepository = new CreateEmployeeRepositoryTypeORM();

const createEmployeeService = new CreateEmployeeService(
  dataValidator,
  findEmployeeByEmailRepository,
  findEmployeeByCPFRepository,
  createEmployeeRepository,
);

export { createEmployeeService };
