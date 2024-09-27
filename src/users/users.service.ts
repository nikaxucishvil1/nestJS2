import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    const user = this.userModel.findById(id).populate("expenses","-userId");
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: number) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }

  async addPost(userId, postId) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException();
    user.expenses.push(postId)
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, user, {
      new: true,
    });
    return updatedUser;
  }
}
