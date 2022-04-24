import { TypesEmployee } from '../../../entities/employee-entity';

export class TypesEmployeeService {
  execute(): string[] {
    const typesEmployee = Object.keys(TypesEmployee).filter((typeUser: any) => {
      return isNaN(typeUser);
    });

    return typesEmployee;
  }
}
