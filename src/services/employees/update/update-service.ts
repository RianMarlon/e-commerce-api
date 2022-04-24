import { getCustomRepository, Not } from 'typeorm';

import { AppError } from '../../../errors/app-error';
import { DataValidator } from '../../../utils/data-validator/data-validator';
import { compareDataWithHash } from '../../../utils/encrypt/encrypt';
import { withoutCharacters } from '../../../utils/without-characters';

import { EmployeesRepository } from '../../../repositories/employees-repository';

import { ReturnEmployeeDTO } from '../dto/return-dto';
import { UpdateEmployeeDTO } from './dto/update-dto';

export class UpdateEmployeeService {
  constructor(private readonly dataValidator: DataValidator) {}

  async execute(
    id: string,
    data: UpdateEmployeeDTO,
  ): Promise<ReturnEmployeeDTO> {
    const employeeToUpdate = await this.dataValidator.transform(
      data,
      UpdateEmployeeDTO,
    );

    const employeesRepository = getCustomRepository(EmployeesRepository);
    const employeeById = await employeesRepository.findOne({
      id,
    });

    if (!employeeById) {
      throw new AppError('Employee not exists', 404);
    }

    const passwordIsValid = await compareDataWithHash(
      employeeToUpdate.password,
      employeeById.password,
    );

    if (!passwordIsValid) {
      throw new AppError('Invalid password', 400);
    }

    const newEmployee = {
      ...employeeById,
      ...employeeToUpdate,
    };

    newEmployee.email = newEmployee.email.toLowerCase();
    newEmployee.cpf = withoutCharacters(newEmployee.cpf);

    const employeeByEmail = await employeesRepository.findOne({
      id: Not(id),
      email: newEmployee.email,
    });

    if (employeeByEmail) {
      throw new AppError('Already exists an employee with this email', 400);
    }

    const employeeByCpf = await employeesRepository.findOne({
      id: Not(id),
      email: newEmployee.cpf,
    });

    if (employeeByCpf) {
      throw new AppError('Already exists an employee with this cpf', 400);
    }

    const employeeUpdated = employeesRepository.create({
      name: newEmployee.name,
      type: newEmployee.type,
      email: newEmployee.email,
      cpf: newEmployee.cpf,
      password: employeeById.password,
      id,
    });

    await employeesRepository.save(employeeUpdated);

    return new ReturnEmployeeDTO(
      employeeUpdated.id,
      employeeUpdated.name,
      employeeUpdated.type,
      employeeUpdated.email,
      employeeUpdated.cpf,
      employeeUpdated.createdAt,
      employeeUpdated.updatedAt,
    );
  }
}
