import { Employee } from '../../../entities/employee-entity';

export interface IFindEmployeeByIdRepository {
  execute(id: string): Promise<Employee | undefined>;
}
