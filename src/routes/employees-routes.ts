import { Router } from 'express';

import { findByIdEmployeeController } from '../controllers/employees/find-by-id/main';
import { typesEmployeeController } from '../controllers/employees/types-employee/main';
import { createEmployeeController } from '../controllers/employees/create/main';

const employeesRouter = Router();

employeesRouter.get('/employees/:id', findByIdEmployeeController.handleRequest);
employeesRouter.get('/types-employee', typesEmployeeController.handleRequest);
employeesRouter.post('/employees', createEmployeeController.handleRequest);

export { employeesRouter };
