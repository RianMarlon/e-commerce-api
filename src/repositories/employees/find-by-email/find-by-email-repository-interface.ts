import { Employee } from '../../../entities/employee-entity';

export interface IFindEmployeeByEmailRepository {
  execute(email: string): Promise<Employee | undefined>;
}
