import { genSalt, hash, compare } from 'bcrypt';

export async function createHash(data: string): Promise<string> {
  const salt = await genSalt(10);
  return await hash(data, salt);
}

export async function compareDataWithHash(
  data: string,
  hash: string,
): Promise<boolean> {
  return await compare(data, hash);
}
