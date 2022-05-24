import { AppError } from '../../../errors/app-error';

import { DataValidator } from '../../../utils/data-validator/data-validator';
import { compareDataWithHash } from '../../../utils/encrypt/encrypt';
import { withoutCharacters } from '../../../utils/without-characters';

import { IFindEmployeeByEmailRepository } from '../../../repositories/employees/find-by-email/find-by-email-repository-interface';
import { IFindEmployeeByCPFRepository } from '../../../repositories/employees/find-by-cpf/find-by-cpf-repository-interface';
import { IFindEmployeeByIdRepository } from '../../../repositories/employees/find-by-id/find-by-id-repository-interface';
import { IUpdateEmployeeRepository } from '../../../repositories/employees/update/update-repository-interface';

import { ReturnEmployeeDTO } from '../dto/return-dto';
import { UpdateEmployeeDTO } from './dto/update-dto';

export class UpdateEmployeeService {
  constructor(
    private readonly dataValidator: DataValidator,
    private readonly findEmployeeByIdRepository: IFindEmployeeByIdRepository,
    private readonly findEmployeeByEmailRepository: IFindEmployeeByEmailRepository,
    private readonly findEmployeeByCPFRepository: IFindEmployeeByCPFRepository,
    private readonly updateEmployeeRepository: IUpdateEmployeeRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateEmployeeDTO,
  ): Promise<ReturnEmployeeDTO> {
    const employeeToUpdate = await this.dataValidator.transform(
      data,
      UpdateEmployeeDTO,
    );

    const employeeById = await this.findEmployeeByIdRepository.execute(id);

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

    const employeeByEmail = await this.findEmployeeByEmailRepository.execute(
      newEmployee.email,
    );

    if (employeeByEmail && employeeByEmail.id != employeeById.id) {
      throw new AppError('Already exists an employee with this email', 400);
    }

    const employeeByCPF = await this.findEmployeeByCPFRepository.execute(
      newEmployee.cpf,
    );

    if (employeeByCPF && employeeByCPF.id != employeeById.id) {
      throw new AppError('Already exists an employee with this cpf', 400);
    }

    const employeeUpdated = await this.updateEmployeeRepository.execute(id, {
      name: newEmployee.name,
      type: newEmployee.type,
      email: newEmployee.email,
      cpf: newEmployee.cpf,
      password: employeeById.password,
    });

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
