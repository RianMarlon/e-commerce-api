import { Router } from 'express';

import { typesEmployeeController } from '../controllers/employees/types-employee/main';
import { createEmployeeController } from '../controllers/employees/create/main';

const employeesRouter = Router();

employeesRouter.get('/types-employee', typesEmployeeController.handleRequest);
employeesRouter.post('/employees', createEmployeeController.handleRequest);

export { employeesRouter };
