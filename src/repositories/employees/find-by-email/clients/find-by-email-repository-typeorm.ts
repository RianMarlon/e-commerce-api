import { getRepository } from 'typeorm';

import { Employee } from '../../../../entities/employee-entity';

import { IFindEmployeeByEmailRepository } from '../find-by-email-repository-interface';

export class FindEmployeeByEmailRepositoryTypeORM
  implements IFindEmployeeByEmailRepository
{
  async execute(email: string): Promise<Employee | undefined> {
    const repository = getRepository(Employee);
    return await repository.findOne({
      email: email.toLowerCase(),
    });
  }
}
