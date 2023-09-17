import { Request } from 'express';
import User from '../../@core/domain/entities/users.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;