import { Request, Response } from 'express';

import { deleteEmployeeService } from '../../../services/employees/delete/main';
import { CustomSuccessResponse } from '../../../utils/success-responses/custom-success-response';

export class DeleteEmployeeController {
  async handleRequest(request: Request, response: Response) {
    const { id } = request.params;

    await deleteEmployeeService.execute(id);
    return response
      .status(200)
      .json(new CustomSuccessResponse('Employee successfully deleted'));
  }
}
