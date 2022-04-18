export interface IPaginationMetadata {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  quantityItemsReturned: number;
}

export interface IPagination<Entity> {
  items: Entity[];
  metadata: IPaginationMetadata;
}
