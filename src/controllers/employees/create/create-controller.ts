import { Request, Response } from 'express';

import { CreateEmployeeService } from '../../../services/employees/create/create-service';

export class CreateEmployeeController {
  constructor(private readonly createEmployeeService: CreateEmployeeService) {}

  async handleRequest(request: Request, response: Response) {
    const employeeCreated = await this.createEmployeeService.execute(
      request.body,
    );

    return response.status(201).json(employeeCreated);
  }
}
