import { Employee } from '../../../entities/employee-entity';

export interface IFindEmployeeByCPFRepository {
  execute(cpf: string): Promise<Employee | undefined>;
}
