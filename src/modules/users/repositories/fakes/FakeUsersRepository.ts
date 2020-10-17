import { ListAllProvidersDTO } from '@modules/appointments/dtos/ListAllProvidersDTO';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';
import UsersRepositoryInterface from '../UsersRepository';

export default class FakeUsersRepository implements UsersRepositoryInterface {
  users: User[] = [];

  public async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async save(user: User): Promise<User> {
    const { id } = user;

    const userIndex = this.users.findIndex(user => user.id === id);

    this.users[userIndex] = user;

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: ListAllProvidersDTO): Promise<User[]> {
    const { users } = this;

    if (except_user_id) {
      return users.filter(user => user.id !== except_user_id);
    }

    return users;
  }
}
