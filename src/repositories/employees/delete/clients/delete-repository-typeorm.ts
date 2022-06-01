import { getRepository } from 'typeorm';

import { Employee } from '../../../../entities/employee-entity';
import { IDeleteEmployeeRepository } from '../delete-repository-interface';

export class DeleteEmployeeRepositoryTypeORM
  implements IDeleteEmployeeRepository
{
  async execute(id: string): Promise<void> {
    const repository = getRepository(Employee);
    await repository.delete(id);
  }
}
