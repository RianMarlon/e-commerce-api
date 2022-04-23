import { FindConditions } from 'typeorm';

export interface IPaginationOptions<Entity> {
  page: number | string;
  limit: number | string;
  where?: FindConditions<Entity>[] | FindConditions<Entity>;
  sortBy?: { [column: string]: 'DESC' | 'ASC' };
  relations?: string[];
}
