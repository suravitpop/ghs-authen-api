// src/prisma/prisma.service.ts

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    this.$use(this.softDeleteMiddleware);
  }
  softDeleteMiddleware: Prisma.Middleware = async (params, next) => {
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      return next({
        ...params,
        action: 'findFirst',
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deleted_at: null,
          },
        },
      });
    }
    if (params.action === 'findMany' || params.action === 'count') {
      return next({
        ...params,
        args: {
          ...params.args,
          where: {
            ...params.args?.where,
            deleted_at: null,
          },
        },
      });
    }
    if (params.action === 'delete') {
      return next({
        ...params,
        action: 'update',
        args: {
          ...params.args,
          data: {
            deleted_at: new Date(),
          },
        },
      });
    }
    return next(params);
  };
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
