import { Router } from 'express';

import { findAllEmployeesController } from '../controllers/employees/find-all/main';
import { findEmployeeByIdController } from '../controllers/employees/find-by-id/main';
import { createEmployeeController } from '../controllers/employees/create/main';
import { updateEmployeeController } from '../controllers/employees/update/main';
import { deleteEmployeeController } from '../controllers/employees/delete/main';

const employeesRouter = Router();

employeesRouter.get('/employees', (request, response) =>
  findAllEmployeesController.handleRequest(request, response),
);
employeesRouter.get('/employees/:id', (request, response) =>
  findEmployeeByIdController.handleRequest(request, response),
);
employeesRouter.post('/employees', (request, response) =>
  createEmployeeController.handleRequest(request, response),
);
employeesRouter.put('/employees/:id', (request, response) =>
  updateEmployeeController.handleRequest(request, response),
);
employeesRouter.delete('/employees/:id', (request, response) =>
  deleteEmployeeController.handleRequest(request, response),
);

export { employeesRouter };
