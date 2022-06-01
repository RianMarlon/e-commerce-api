import { getRepository } from 'typeorm';

import { Employee } from '../../../../entities/employee-entity';

import { IFindEmployeeByIdRepository } from '../find-by-id-repository-interface';

export class FindEmployeeByIdRepositoryTypeORM
  implements IFindEmployeeByIdRepository
{
  async execute(id: string): Promise<Employee | undefined> {
    const repository = getRepository(Employee);
    return await repository.findOne(id);
  }
}
