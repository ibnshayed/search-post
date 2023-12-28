import { IsNumber, Max, Min } from 'class-validator';

export class PaginateDto {
  @Min(1)
  @IsNumber()
  page: number;

  @Max(100)
  @IsNumber()
  limit: number;
}
