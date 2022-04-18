import { Repository, SelectQueryBuilder } from 'typeorm';

import { IPaginationOptions } from './interfaces/pagination-options-interface';
import {
  IPaginationMetadata,
  IPagination,
} from './interfaces/pagination-interface';

const tableName = (alias: string, path: string): string => {
  return `${alias}_${path.replace('.', '_')}`;
};

const tableWithField = (alias: string, path: string): string => {
  const pathSplitted = path.split('.');
  const field = pathSplitted.pop();

  if (pathSplitted.length > 0) {
    return `${alias}_${pathSplitted.join('_')}.${field}`;
  }

  return `${alias}.${field}`;
};

export async function paginate<Entity>(
  repository: Repository<Entity> | SelectQueryBuilder<Entity>,
  paginationOptions: IPaginationOptions<Entity>,
): Promise<IPagination<Entity>> {
  const { limit, page, where, relations } = paginationOptions;
  let queryBuilder: SelectQueryBuilder<Entity>;

  if (repository instanceof Repository) {
    queryBuilder = repository
      .createQueryBuilder('e')
      .limit(Number(limit))
      .offset(Number(page) - 1);
  } else {
    queryBuilder = repository;
    queryBuilder.limit(Number(limit)).offset(Number(page) - 1);
  }

  if (relations) {
    relations.forEach((relation) => {
      queryBuilder.leftJoinAndSelect(
        tableWithField(queryBuilder.alias, relation),
        tableName(queryBuilder.alias, relation),
      );
    });
  }

  if (where) {
    queryBuilder.andWhere(where);
  }

  const items = await queryBuilder.getMany();
  const totalItems = await queryBuilder.getCount();
  const totalPages = Math.ceil(totalItems / Number(limit));
  const quantityItemsReturned = items.length;

  const metadata: IPaginationMetadata = {
    totalItems,
    totalPages,
    currentPage: Number(page),
    itemsPerPage: Number(limit),
    quantityItemsReturned: quantityItemsReturned,
  };

  return {
    items,
    metadata,
  };
}
