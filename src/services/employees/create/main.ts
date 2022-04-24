import { CreateEmployeeService } from './create-service';
import { DataValidator } from '../../../utils/data-validator/data-validator';

const dataValidator = new DataValidator();
const createEmployeeService = new CreateEmployeeService(dataValidator);

export { createEmployeeService };
