import { Request, Response } from 'express';

import { FindAllEmployeesWithPaginationService } from '../../../services/employees/find-all-with-pagination/find-all-with-pagination-service';

export class FindAllEmployeesController {
  constructor(
    private readonly findAllEmployeesWithPaginationService: FindAllEmployeesWithPaginationService,
  ) {}

  async handleRequest(request: Request, response: Response) {
    const { page, limit } = request.query;

    const employeesPaginated =
      await this.findAllEmployeesWithPaginationService.execute({
        page: page ? page.toString() : '1',
        limit: limit ? limit.toString() : '10',
      });

    return response.status(200).json(employeesPaginated);
  }
}
