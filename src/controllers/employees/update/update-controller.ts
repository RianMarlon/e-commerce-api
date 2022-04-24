import { Request, Response } from 'express';

import { updateEmployeeService } from '../../../services/employees/update/main';

export class UpdateEmployeeController {
  async handleRequest(request: Request, response: Response) {
    const { id } = request.params;

    const employeeUpdated = await updateEmployeeService.execute(
      id,
      request.body,
    );

    return response.status(200).json(employeeUpdated);
  }
}
