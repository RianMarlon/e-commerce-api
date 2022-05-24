import { AppError } from '../../../errors/app-error';

import { IFindEmployeeByIdRepository } from '../../../repositories/employees/find-by-id/find-by-id-repository-interface';

import { ReturnEmployeeDTO } from '../dto/return-dto';

export class FindEmployeeByIdService {
  constructor(
    private readonly findEmployeeByIdRepository: IFindEmployeeByIdRepository,
  ) {}

  async execute(id: string) {
    const employeeById = await this.findEmployeeByIdRepository.execute(id);

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
