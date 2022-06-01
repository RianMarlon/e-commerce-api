import { Request, Response } from 'express';
import { FindEmployeeByIdService } from '../../../services/employees/find-by-id/find-by-id-service';

export class FindEmployeeByIdController {
  constructor(
    private readonly findEmployeeByIdService: FindEmployeeByIdService,
  ) {}

  async handleRequest(request: Request, response: Response) {
    const { id } = request.params;

    const employeeById = await this.findEmployeeByIdService.execute(id);

    return response.status(200).json(employeeById);
  }
}
