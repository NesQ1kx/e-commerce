import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { IUser } from 'src/intefaces/user.interface';
import * as bcrypt from 'bcrypt';
import { EUserRoles } from 'src/enums/user-roles.enum';

const SALT_OR_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<IUser>) {}

  public async create(createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await this.generateHash(createUserDto.password);
    createUserDto.role = EUserRoles.user;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  public async isUserExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }

  private async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  public async checkUserPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    return bcrypt.compare(password, user.password);
  }

  public async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email });
  }
}
