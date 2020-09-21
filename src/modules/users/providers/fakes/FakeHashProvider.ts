import HashProviderInterface from '../interfaces/HashProviderImplementation';

export default class FakeHashProvider implements HashProviderInterface {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
