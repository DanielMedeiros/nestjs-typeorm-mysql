import { IsEmail } from 'class-validator';

export class AuthForgetDTO {
  @IsEmail()
  email: any;
}
