import { IsOptional, IsString } from 'class-validator';

export class FilterParamsEmployeesDTO {
  @IsOptional()
  @IsString()
  search?: string;
}
