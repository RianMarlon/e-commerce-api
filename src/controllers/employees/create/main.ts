import { createEmployeeService } from '../../../services/employees/create/main';
import { CreateEmployeeController } from './create-controller';

const createEmployeeController = new CreateEmployeeController(
  createEmployeeService,
);

export { createEmployeeController };
