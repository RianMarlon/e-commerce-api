import { DataValidator } from '../../../utils/data-validator/data-validator';
import { FindAllEmployeesService } from './find-all-service';

const dataValidator = new DataValidator();
const findAllEmployeesService = new FindAllEmployeesService(dataValidator);

export { findAllEmployeesService };
