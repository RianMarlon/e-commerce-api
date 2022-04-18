import { FindConditions } from 'typeorm';

export interface IWhere<T> {
  get findConditions(): FindConditions<T>[];
  conditions(newConditions: FindConditions<T>[]): void;
  andConditions(newConditions: FindConditions<T>[]): void;
  orConditions(newConditions: FindConditions<T>[]): void;
}
