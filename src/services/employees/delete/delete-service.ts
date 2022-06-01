import { AppError } from '../../../errors/app-error';

import { IDeleteEmployeeRepository } from '../../../repositories/employees/delete/delete-repository-interface';
import { IFindEmployeeByIdRepository } from '../../../repositories/employees/find-by-id/find-by-id-repository-interface';

export class DeleteEmployeeService {
  constructor(
    private readonly findEmployeeByIdRepository: IFindEmployeeByIdRepository,
    private readonly deleteEmployeeRepository: IDeleteEmployeeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const employeeById = await this.findEmployeeByIdRepository.execute(id);

    if (!employeeById) {
      throw new AppError('Employee not exists', 404);
    }

    await this.deleteEmployeeRepository.execute(id);
  }
}
