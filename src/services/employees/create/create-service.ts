import { AppError } from '../../../errors/app-error';
import { DataValidator } from '../../../utils/data-validator/data-validator';
import { createHash } from '../../../utils/encrypt/encrypt';
import { withoutCharacters } from '../../../utils/without-characters';

import { Employee } from '../../../entities/employee-entity';

import { IFindEmployeeByEmailRepository } from '../../../repositories/employees/find-by-email/find-by-email-repository-interface';
import { IFindEmployeeByCPFRepository } from '../../../repositories/employees/find-by-cpf/find-by-cpf-repository-interface';
import { ICreateEmployeeRepository } from '../../../repositories/employees/create/create-repository-interface';

import { ReturnEmployeeDTO } from '../dto/return-dto';
import { CreateEmployeeDTO } from './dto/create-dto';

export class CreateEmployeeService {
  constructor(
    private readonly dataValidator: DataValidator,
    private readonly findEmployeeByEmailRepository: IFindEmployeeByEmailRepository,
    private readonly findEmployeeByCPFRepository: IFindEmployeeByCPFRepository,
    private readonly createEmployeeRepository: ICreateEmployeeRepository,
  ) {}

  async execute(data: CreateEmployeeDTO): Promise<ReturnEmployeeDTO> {
    const employeeToCreate = await this.dataValidator.transform(
      data,
      CreateEmployeeDTO,
    );

    employeeToCreate.email = employeeToCreate.email.toLocaleLowerCase();
    employeeToCreate.cpf = withoutCharacters(employeeToCreate.cpf);
    employeeToCreate.password = await createHash(employeeToCreate.password);

    const employeeByEmail = await this.findEmployeeByEmailRepository.execute(
      employeeToCreate.email,
    );

    if (employeeByEmail) {
      throw new AppError('Already exists an employee with this email', 400);
    }

    const employeeByCpf = await this.findEmployeeByCPFRepository.execute(
      employeeToCreate.cpf,
    );

    if (employeeByCpf) {
      throw new AppError('Already exists an employee with this cpf', 400);
    }

    const employeeCreated = await this.createEmployeeRepository.execute({
      name: employeeToCreate.name,
      type: employeeToCreate.type,
      email: employeeToCreate.email,
      cpf: employeeToCreate.cpf,
      password: employeeToCreate.password,
    } as Employee);

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
