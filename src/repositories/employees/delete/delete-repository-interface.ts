export interface IDeleteEmployeeRepository {
  execute(id: string): Promise<void>;
}
