import { Request, Response } from 'express';

import { findByIdEmployeeService } from '../../../services/employees/find-by-id/main';

export class FindByIdEmployeeController {
  async handleRequest(request: Request, response: Response) {
    const { id } = request.params;

    const employeeById = await findByIdEmployeeService.execute(id);

    return response.status(200).json(employeeById);
  }
}
