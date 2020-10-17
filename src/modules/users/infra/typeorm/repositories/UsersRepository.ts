import { getRepository, Not, Repository } from 'typeorm';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import { ListAllProvidersDTO } from '@modules/appointments/dtos/ListAllProvidersDTO';

export default class UsersRepository implements UsersRepositoryInterface {
  private ormRepository: Repository<User>;

  public constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  public async findAllProviders({
    except_user_id,
  }: ListAllProvidersDTO): Promise<User[]> {
    let providers: User[];

    if (except_user_id) {
      providers = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      providers = await this.ormRepository.find();
    }

    return providers;
  }
}
