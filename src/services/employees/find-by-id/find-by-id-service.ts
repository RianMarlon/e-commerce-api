import { getCustomRepository } from 'typeorm';

import { AppError } from '../../../errors/app-error';

import { EmployeesRepository } from '../../../repositories/employees-repository';

import { ReturnEmployeeDTO } from '../dto/return-dto';

export class FindByIdEmployeeService {
  async execute(id: string) {
    const employeesRepository = getCustomRepository(EmployeesRepository);
    const employeeById = await employeesRepository.findOne({
      id,
    });

    if (!employeeById) {
      throw new AppError('Employee not exists', 404);
    }

    return new ReturnEmployeeDTO(
      employeeById.id,
      employeeById.name,
      employeeById.type,
      employeeById.email,
      employeeById.cpf,
      employeeById.createdAt,
      employeeById.updatedAt,
    );
  }
}
