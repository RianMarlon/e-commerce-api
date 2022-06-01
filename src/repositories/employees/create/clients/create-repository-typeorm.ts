import { getRepository } from 'typeorm';

import { Employee } from '../../../../entities/employee-entity';

import { ICreateEmployeeRepository } from '../create-repository-interface';

export class CreateEmployeeRepositoryTypeORM
  implements ICreateEmployeeRepository
{
  async execute(employee: Employee) {
    const repository = getRepository(Employee);

    const employeeCreated = repository.create(employee);
    await repository.save(employeeCreated);

    return employeeCreated;
  }
}
