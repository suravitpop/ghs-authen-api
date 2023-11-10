// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements user {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  deleted_at: Date;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  username: string;

  @Exclude()
  password: string;

  @ApiProperty()
  is_active: boolean | true;
}
