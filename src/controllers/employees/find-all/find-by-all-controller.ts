import { Request, Response } from 'express';
import { findAllEmployeesService } from '../../../services/employees/find-all/main';

export class FindAllEmployeesController {
  async handleRequest(request: Request, response: Response) {
    const { page, limit } = request.query;

    const employeesPaginated = await findAllEmployeesService.execute({
      page: page ? page.toString() : '1',
      limit: limit ? limit.toString() : '10',
    });

    return response.status(200).json(employeesPaginated);
  }
}
