import { FindEmployeeByIdController } from './find-by-id-controller';

import { findEmployeeByIdService } from '../../../services/employees/find-by-id/main';

const findEmployeeByIdController = new FindEmployeeByIdController(
  findEmployeeByIdService,
);

export { findEmployeeByIdController };
