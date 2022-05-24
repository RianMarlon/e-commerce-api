import { Request, Response } from 'express';

import { DeleteEmployeeService } from '../../../services/employees/delete/delete-service';

import { CustomSuccessResponse } from '../../../utils/success-responses/custom-success-response';

export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeService: DeleteEmployeeService) {}

  async handleRequest(request: Request, response: Response) {
    const { id } = request.params;

    await this.deleteEmployeeService.execute(id);
    return response
      .status(200)
      .json(new CustomSuccessResponse('Employee successfully deleted'));
  }
}
