import { getCustomRepository } from 'typeorm';

import { AppError } from '../../../errors/app-error';
import { DataValidator } from '../../../utils/data-validator/data-validator';
import { createHash } from '../../../utils/encrypt/encrypt';
import { withoutCharacters } from '../../../utils/without-characters';

import { EmployeesRepository } from '../../../repositories/employees-repository';

import { ReturnEmployeeDTO } from '../dto/return-dto';
import { CreateEmployeeDTO } from './dto/create-dto';

export class CreateEmployeeService {
  constructor(private readonly dataValidator: DataValidator) {}

  async execute(data: CreateEmployeeDTO): Promise<ReturnEmployeeDTO> {
    const employeeToCreate = await this.dataValidator.transform(
      data,
      CreateEmployeeDTO,
    );

    employeeToCreate.email = employeeToCreate.email.toLocaleLowerCase();
    employeeToCreate.cpf = withoutCharacters(employeeToCreate.cpf);
    employeeToCreate.password = await createHash(employeeToCreate.password);

    const employeesRepository = getCustomRepository(EmployeesRepository);
    const employeeByEmail = await employeesRepository.findOne({
      email: employeeToCreate.email,
    });

    if (employeeByEmail) {
      throw new AppError('Already exists an employee with this email', 400);
    }

    const employeeByCpf = await employeesRepository.findOne({
      email: employeeToCreate.email,
    });

    if (employeeByCpf) {
      throw new AppError('Already exists an employee with this cpf', 400);
    }

    const employeeCreated = employeesRepository.create({
      name: employeeToCreate.name,
      type: employeeToCreate.type,
      email: employeeToCreate.email,
      cpf: employeeToCreate.cpf,
      password: employeeToCreate.password,
    });

    await employeesRepository.save(employeeCreated);

    return new ReturnEmployeeDTO(
      employeeCreated.id,
      employeeCreated.name,
      employeeCreated.type,
      employeeCreated.email,
      employeeCreated.cpf,
      employeeCreated.createdAt,
      employeeCreated.updatedAt,
    );
  }
}
