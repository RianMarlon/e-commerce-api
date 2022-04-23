export interface IPaginationConfig {
  sortableColumns: string[];
  defaultSortBy?: { [column: string]: 'DESC' | 'ASC' };
}
