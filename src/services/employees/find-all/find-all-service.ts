import { getCustomRepository } from 'typeorm';

import { DataValidator } from '../../../utils/data-validator/data-validator';
import { PaginationParamsDTO } from '../../../utils/paginate/dto/pagination-params-dto';
import { IPagination } from '../../../utils/paginate/interfaces/pagination-interface';

import { EmployeesRepository } from '../../../repositories/employees-repository';

import { ReturnEmployeeDTO } from '../dto/return-dto';

export class FindAllEmployeesService {
  constructor(private readonly dataValidator: DataValidator) {}

  async execute(
    paginationParams: PaginationParamsDTO,
  ): Promise<IPagination<ReturnEmployeeDTO>> {
    const paginationOptionsWithDTO = await this.dataValidator.transform(
      paginationParams,
      PaginationParamsDTO,
    );

    const employeesRepository = getCustomRepository(EmployeesRepository);

    const employees = await employeesRepository.findAllWithPagination({
      limit: paginationOptionsWithDTO.limit,
      page: paginationOptionsWithDTO.page,
      sortBy: {
        createdAt: 'DESC',
        updatedAt: 'DESC',
      },
    });

    const items = employees.items.map((employee) => {
      return new ReturnEmployeeDTO(
        employee.id,
        employee.name,
        employee.type,
        employee.email,
        employee.cpf,
        employee.createdAt,
        employee.updatedAt,
      );
    });

    return {
      items: items,
      metadata: employees.metadata,
    };
  }
}
