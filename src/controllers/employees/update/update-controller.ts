import { Request, Response } from 'express';

import { UpdateEmployeeService } from '../../../services/employees/update/update-service';

export class UpdateEmployeeController {
  constructor(private readonly updateEmployeeService: UpdateEmployeeService) {}

  async handleRequest(request: Request, response: Response) {
    const { id } = request.params;

    const employeeUpdated = await this.updateEmployeeService.execute(
      id,
      request.body,
    );

    return response.status(200).json(employeeUpdated);
  }
}
