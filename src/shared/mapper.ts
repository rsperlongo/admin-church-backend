import { UsersDto } from 'src/@core/domain/dto/Users.dto';
import UserEntity from 'src/@core/domain/entities/users.entity';

export const toUserDto = (data: UserEntity): UsersDto => {
  const { id, username } = data;

  const usersDto: UsersDto = {
    id,
    username,
  };

  return usersDto;
};
