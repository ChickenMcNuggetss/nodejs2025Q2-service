import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly oldPassword: string;
  @IsNotEmpty()
  readonly newPassword: string;
}
