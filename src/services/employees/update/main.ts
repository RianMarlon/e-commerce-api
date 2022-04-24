import { UpdateEmployeeService } from './update-service';
import { DataValidator } from '../../../utils/data-validator/data-validator';

const dataValidator = new DataValidator();
const updateEmployeeService = new UpdateEmployeeService(dataValidator);

export { updateEmployeeService };
