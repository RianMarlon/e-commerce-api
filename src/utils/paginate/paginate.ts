import { Repository, SelectQueryBuilder } from 'typeorm';

import { IPaginationOptions } from './interfaces/pagination-options-interface';
import {
  IPaginationMetadata,
  IPagination,
} from './interfaces/pagination-interface';
import { IPaginationConfig } from './interfaces/pagination-config-interface';

import { camelCaseToSnakeCase } from '../camel-case-to-snake-case';

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
  paginationConfig: IPaginationConfig,
): Promise<IPagination<Entity>> {
  const { limit, page, where, relations, sortBy } = paginationOptions;
  const { sortableColumns, defaultSortBy } = paginationConfig;
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

  if (defaultSortBy) {
    for (const key of Object.keys(defaultSortBy)) {
      const tableWithFieldAlias = tableWithField(queryBuilder.alias, key);
      const tableWithFieldInSnakeCaseAlias =
        camelCaseToSnakeCase(tableWithFieldAlias);

      queryBuilder.addOrderBy(
        tableWithFieldInSnakeCaseAlias,
        defaultSortBy[key],
      );
    }
  }

  if (sortBy) {
    for (const key of Object.keys(sortBy)) {
      const isSortableColumn = sortableColumns.find(
        (column) =>
          column === key && (sortBy[key] === 'DESC' || sortBy[key] === 'ASC'),
      );

      if (isSortableColumn) {
        const tableWithFieldAlias = tableWithField(queryBuilder.alias, key);
        const tableWithFieldAliasInSnakeCase =
          camelCaseToSnakeCase(tableWithFieldAlias);

        queryBuilder.addOrderBy(tableWithFieldAliasInSnakeCase, sortBy[key]);
      }
    }
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
