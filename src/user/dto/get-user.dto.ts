import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
export class GetUserDto {
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  public page: number = 1;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  public limit: number = 10;

  @IsOptional()
  @ApiProperty({ required: false })
  public search: string;
}
