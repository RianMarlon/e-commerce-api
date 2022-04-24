import { TypesEmployee } from '../../../entities/employee-entity';

export class ReturnEmployeeDTO {
  id: string;
  name: string;
  type: TypesEmployee;
  email: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    type: TypesEmployee,
    email: string,
    cpf: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.email = email;
    this.cpf = cpf;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
