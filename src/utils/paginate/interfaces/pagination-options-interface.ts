import { IWhere } from '../../where/interfaces/where.interface';

export interface IPaginationOptions<Entity> {
  page: number | string;
  limit: number | string;
  where?: IWhere<Entity>;
  relations?: string[];
}
