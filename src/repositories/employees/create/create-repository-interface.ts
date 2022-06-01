import { Employee } from '../../../entities/employee-entity';

export interface ICreateEmployeeRepository {
  execute(employee: Employee): Promise<Employee>;
}
