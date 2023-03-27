import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

//Defined a "type" of "authentication request"
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
