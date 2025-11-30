import { IsEnum, IsString, Max, Min } from 'class-validator';
import { Role } from '../../enums/roles.enum';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @Min(8)
  @Max(16)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Role, { message: 'role must be a valid Role enum value' })
  role: Role;
}
