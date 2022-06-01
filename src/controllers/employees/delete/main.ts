import { deleteEmployeeService } from '../../../services/employees/delete/main';

import { DeleteEmployeeController } from './delete-controller';

const deleteEmployeeController = new DeleteEmployeeController(
  deleteEmployeeService,
);

export { deleteEmployeeController };
