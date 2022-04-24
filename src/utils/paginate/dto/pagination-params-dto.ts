import { IsNumberString } from 'class-validator';

export class PaginationParamsDTO {
  @IsNumberString()
  page!: string;

  @IsNumberString()
  limit!: string;
}
