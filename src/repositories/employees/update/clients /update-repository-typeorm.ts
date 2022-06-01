import { getRepository } from 'typeorm';

import { Employee } from '../../../../entities/employee-entity';
import { IUpdateEmployeeRepository } from '../update-repository-interface';

export class UpdateEmployeeRepositoryTypeORM
  implements IUpdateEmployeeRepository
{
  async execute(id: string, employee: Partial<Employee>): Promise<Employee> {
    const repository = getRepository(Employee);

    const employeeUpdated = repository.create({
      ...employee,
      id,
    });
    await repository.save(employeeUpdated);

    return employeeUpdated;
  }
}
