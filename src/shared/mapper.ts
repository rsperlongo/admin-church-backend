import { UserDto } from 'src/@core/domain/dto/Users.dto';
import UserEntity from 'src/@core/domain/entities/users.entity';

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, email, password } = data;

  const usersDto: UserDto = {
    id,
    email,
    password,
  };

  return usersDto;
};
