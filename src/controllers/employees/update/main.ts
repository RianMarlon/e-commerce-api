import { updateEmployeeService } from '../../../services/employees/update/main';
import { UpdateEmployeeController } from './update-controller';

const updateEmployeeController = new UpdateEmployeeController(
  updateEmployeeService,
);

export { updateEmployeeController };
