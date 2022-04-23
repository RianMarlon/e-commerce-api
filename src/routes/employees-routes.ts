import { Router } from 'express';

import { typesEmployeeController } from '../controllers/employees/types-employee/main';

const employeesRouter = Router();

employeesRouter.get('/types-employee', typesEmployeeController.handleRequest);

export { employeesRouter };
