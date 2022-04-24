import { getCustomRepository } from 'typeorm';

import { AppError } from '../../../errors/app-error';

import { EmployeesRepository } from '../../../repositories/employees-repository';

export class DeleteEmployeeService {
  async execute(id: string): Promise<void> {
    const employeesRepository = getCustomRepository(EmployeesRepository);
    const userById = await employeesRepository.findOne({
      id,
    });

    if (!userById) {
      throw new AppError('User not exists', 404);
    }

    await employeesRepository.remove(userById);
  }
}
