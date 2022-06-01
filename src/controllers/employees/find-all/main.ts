import { findAllEmployeesWithPaginationService } from '../../../services/employees/find-all-with-pagination/main';
import { FindAllEmployeesController } from './find-all-controller';

const findAllEmployeesController = new FindAllEmployeesController(
  findAllEmployeesWithPaginationService,
);

export { findAllEmployeesController };
