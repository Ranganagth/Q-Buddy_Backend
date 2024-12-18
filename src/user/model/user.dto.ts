import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, Matches, IsEnum } from 'class-validator';

export enum roles {
  User = 'User',
  Partner = 'Partner',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber(null)
  @Matches(/^[0-9]{10}$/, {
    message: 'Contact number must be a 10-digit number',
  })
  @IsNotEmpty()
  contactNumber: string;
  
  @IsEnum(roles)
  @IsString()
  @IsNotEmpty()
  role: string
}

export class LoginDto {
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}
