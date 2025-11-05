import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HashService } from 'src/shared/hash/services/hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async findOneBy(field: keyof User, value: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ [field]: value });

    if (!user) {
      throw new NotFoundException(`User with is not found`);
    }
    return user;
  }

  async getUserInfo(id: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ${id} is not found`);
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });

    if (user) {
      throw new ConflictException(
        `User with email ${data.email} already exists`,
      );
    }

    const hashedPassword = await this.hashService.hash(data.password);

    const newUser = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async updateUser(
    id: string,
    data: UpdateUserDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      if (data.email && data.email !== user.email) {
        const existingUser = await this.userRepository.findOneBy({
          email: data.email,
        });
        if (existingUser) {
          throw new ConflictException(`Email ${data.email} is already in use`);
        }
        user.email = data.email;
      }

      if (data.password) {
        user.password = await this.hashService.hash(data.password);
      }

      const { firstName, lastName, role } = data;
      Object.assign(user, { firstName, lastName, roles: role });

      await this.userRepository.save(user);

      return { success: true, message: 'User updated successfully' };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: 'Unable to update user',
      };
    }
  }

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.userRepository.delete({ id });

      return {
        success: true,
        message: 'Successfully deleted user',
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'User was not deleted' };
    }
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await this.hashService.compare(
      currentPassword,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Passwords do not match');
    }

    user.password = await this.hashService.hash(newPassword);
    await this.userRepository.save(user);

    return { success: true, message: 'Password updated successfully' };
  }
}
