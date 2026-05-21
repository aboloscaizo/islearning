import { Injectable } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService
  ){}
  getHello(): string {
    return 'Hello World!';
  }

  testData(): string {
    return `<h1>Hello, My name is QuanTran</h1>`;
  }

  async testDb() {
    const count = await this.prisma.user.count();
    return {
      db: "ok",
      userCount: count ,
    }
  }
}
