import { getRepository } from 'typeorm';

import { withoutCharacters } from '../../../../utils/without-characters';

import { Employee } from '../../../../entities/employee-entity';

import { IFindEmployeeByCPFRepository } from '../find-by-cpf-repository-interface';

export class FindEmployeeByCPFRepositoryTypeORM
  implements IFindEmployeeByCPFRepository
{
  async execute(cpf: string): Promise<Employee | undefined> {
    const repository = getRepository(Employee);
    return await repository.findOne({
      cpf: withoutCharacters(cpf),
    });
  }
}
