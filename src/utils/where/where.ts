import { merge } from 'lodash';
import { FindConditions } from 'typeorm';

import { IWhere } from './interfaces/where.interface';

export class Where<T> implements IWhere<T> {
  private _findConditions: FindConditions<T>[] = [];

  get findConditions(): FindConditions<T>[] {
    return this._findConditions;
  }

  conditions(newConditions: FindConditions<T>[]): void {
    this._findConditions = newConditions;
  }

  orConditions(newConditions: FindConditions<T>[]): void {
    newConditions.forEach((newCondition) => {
      this._findConditions.push(newCondition);
    });
  }

  andConditions(newConditions: FindConditions<T>[]): void {
    newConditions.forEach((newCondition) => {
      if (this._findConditions.length > 0) {
        this._findConditions = this._findConditions.map((condition) => {
          return merge(condition, newCondition);
        });
      } else {
        this._findConditions.push(newCondition);
      }
    });
  }
}
