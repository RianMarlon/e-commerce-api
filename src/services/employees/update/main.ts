import { DataValidator } from '../../../utils/data-validator/data-validator';
import { Encryptor } from '../../../utils/encryptor/encryptor';

import { FindEmployeeByIdRepositoryTypeORM } from '../../../repositories/employees/find-by-id/clients/find-by-id-repository-typeorm';
import { FindEmployeeByEmailRepositoryTypeORM } from '../../../repositories/employees/find-by-email/clients/find-by-email-repository-typeorm';
import { FindEmployeeByCPFRepositoryTypeORM } from '../../../repositories/employees/find-by-cpf/clients/find-by-cpf-repository-typeorm';
import { UpdateEmployeeRepositoryTypeORM } from '../../../repositories/employees/update/clients /update-repository-typeorm';

import { UpdateEmployeeService } from './update-service';

const dataValidator = new DataValidator();
const encryptor = new Encryptor();
const findEmployeeByIdRepository = new FindEmployeeByIdRepositoryTypeORM();
const findEmployeeByEmailRepository =
  new FindEmployeeByEmailRepositoryTypeORM();
const findEmployeeByCPFRepository = new FindEmployeeByCPFRepositoryTypeORM();
const updateEmployeeRepository = new UpdateEmployeeRepositoryTypeORM();

const updateEmployeeService = new UpdateEmployeeService(
  dataValidator,
  encryptor,
  findEmployeeByIdRepository,
  findEmployeeByEmailRepository,
  findEmployeeByCPFRepository,
  updateEmployeeRepository,
);

export { updateEmployeeService };
