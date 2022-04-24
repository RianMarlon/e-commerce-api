import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

import { TypesEmployee } from '../../../../entities/employee-entity';

import { IsCPF } from '../../../../utils/decorators/is-cpf';

export class UpdateEmployeeDTO {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name!: string;

  @IsOptional()
  @IsEnum(TypesEmployee)
  type!: TypesEmployee;

  @IsOptional()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsCPF()
  cpf!: string;

  @IsString()
  password!: string;
}
