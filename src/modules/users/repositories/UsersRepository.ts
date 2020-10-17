import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import { ListAllProvidersDTO } from '@modules/appointments/dtos/ListAllProvidersDTO';

export default interface UsersRepositoryInterface {
  findAllProviders({ except_user_id }: ListAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
