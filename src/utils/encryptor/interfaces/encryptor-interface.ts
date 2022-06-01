export interface IEncryptor {
  createHash(password: string): Promise<string>;
  compareDataWithHash(data: string, hash: string): Promise<boolean>;
}
