import { Employee } from '../../../entities/employee-entity';

export interface IUpdateEmployeeRepository {
  execute(id: string, employee: Partial<Employee>): Promise<Employee>;
}
