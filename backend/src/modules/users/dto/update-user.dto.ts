import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRole, UserStatus } from '../schemas/user.schema';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(2, 100)
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}
