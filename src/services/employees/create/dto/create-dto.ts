import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

import { TypesEmployee } from '../../../../entities/employee-entity';

import { IsCPF } from '../../../../utils/decorators/is-cpf';

export class CreateEmployeeDTO {
  @IsString()
  @Length(1, 100)
  name!: string;

  @IsEnum(TypesEmployee)
  type!: TypesEmployee;

  @IsEmail()
  email!: string;

  @IsCPF()
  cpf!: string;

  @IsString()
  @Length(8, 30)
  password!: string;
}
