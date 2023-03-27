import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //* This module is global
@Module({
  providers: [PrismaService],
  exports: [PrismaService], //*others module can use PrismaService
})
export class PrismaModule {}
