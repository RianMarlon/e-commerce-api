import { Request, Response } from 'express';
import { createEmployeeService } from '../../../services/employees/create/main';

export class CreateEmployeeController {
  async handleRequest(request: Request, response: Response) {
    const employeeCreated = await createEmployeeService.execute(request.body);

    return response.status(201).json(employeeCreated);
  }
}
