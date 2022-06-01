import { DataValidator } from '../../../utils/data-validator/data-validator';
import { PaginationParamsDTO } from '../../../utils/paginate/dto/pagination-params-dto';
import { IPagination } from '../../../utils/paginate/interfaces/pagination-interface';

import { IFindAllEmployeesWithPaginationRepository } from '../../../repositories/employees/find-all-with-pagination/find-all-with-pagination-repository-interface';

import { ReturnEmployeeDTO } from '../dto/return-dto';

export class FindAllEmployeesWithPaginationService {
  constructor(
    private readonly dataValidator: DataValidator,
    private readonly findAllEmployeesWithPaginationRepository: IFindAllEmployeesWithPaginationRepository,
  ) {}

  async execute(
    paginationParams: PaginationParamsDTO,
  ): Promise<IPagination<ReturnEmployeeDTO>> {
    const paginationOptionsWithDTO = await this.dataValidator.transform(
      paginationParams,
      PaginationParamsDTO,
    );

    const employees =
      await this.findAllEmployeesWithPaginationRepository.execute({
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
