import { Request, Response } from 'express';

import { typesEmployeeService } from '../../../services/employees/types-employee/main';

export class TypesEmployeeController {
  async handleRequest(_request: Request, response: Response) {
    const types = typesEmployeeService.execute();
    return response.status(200).json(types);
  }
}
