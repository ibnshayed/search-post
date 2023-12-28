import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class FindOneUserDto {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  id: string;
}
