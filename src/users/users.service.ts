import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;

    try {
      await this.userModel.create({
        email,
        password: bcrypt.hashSync(password, 5)
      });

      return {
        ok: true,
        msg: 'success'
      };

    } catch (error) {
      throw new BadRequestException(`Error in database`);
    }
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if(!user)
    throw new BadRequestException('User does not exist');

    return user;
  }

  async login(userLogin: LoginDto) {
    const { email, password } = userLogin;

    const user = await this.userModel.findOne({email});

    if(!user)
    throw new UnauthorizedException('Not valid credentials');
    
    if(!bcrypt.compareSync(password, user.password))
    throw new UnauthorizedException('Not valid credentials');
    
    const token = this.jwtService.sign({id: user.id});
    return {
      ok: true,
      msg: 'success',
      token
    };
  }

  getAuth(token: string) {
    try {
      this.jwtService.verify(token);
      return {
        status: true,
        msg: 'success'
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        msg: 'token expired'
      };
    }
  }
}
