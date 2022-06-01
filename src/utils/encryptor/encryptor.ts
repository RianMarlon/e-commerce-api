import { genSalt, hash, compare } from 'bcrypt';

import { IEncryptor } from './interfaces/encryptor-interface';

export class Encryptor implements IEncryptor {
  async createHash(data: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(data, salt);
  }

  async compareDataWithHash(data: string, hash: string): Promise<boolean> {
    return await compare(data, hash);
  }
}
