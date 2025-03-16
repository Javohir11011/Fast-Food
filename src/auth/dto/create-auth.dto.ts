import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterAuhtDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
