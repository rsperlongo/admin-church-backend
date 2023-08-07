import { User } from './../@core/infra/schema/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    return this.userModel.create({
      username,
      password,
      firstName,
      lastName,
    });
  }

  async getUser(query: object): Promise<User> {
    return this.userModel.findById(query);
  }

  async getAll(query: object) {
    const getUsers = this.userModel.find(query);

    if (!getUsers) {
      throw new NotFoundException('User not found');
    }

    return getUsers;
  }

  async getUserById(id: string): Promise<User> {
    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
