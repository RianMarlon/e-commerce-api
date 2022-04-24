import { Router } from 'express';

import { findAllEmployeesController } from '../controllers/employees/find-all/main';
import { findByIdEmployeeController } from '../controllers/employees/find-by-id/main';
import { typesEmployeeController } from '../controllers/employees/types-employee/main';
import { createEmployeeController } from '../controllers/employees/create/main';
import { updateEmployeeController } from '../controllers/employees/update/main';
import { deleteEmployeeController } from '../controllers/employees/delete/main';

const employeesRouter = Router();

employeesRouter.get('/employees', findAllEmployeesController.handleRequest);
employeesRouter.get('/employees/:id', findByIdEmployeeController.handleRequest);
employeesRouter.get('/types-employee', typesEmployeeController.handleRequest);
employeesRouter.post('/employees', createEmployeeController.handleRequest);
employeesRouter.put('/employees/:id', updateEmployeeController.handleRequest);
employeesRouter.delete(
  '/employees/:id',
  deleteEmployeeController.handleRequest,
);

export { employeesRouter };
