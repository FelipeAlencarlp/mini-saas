import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ClientsModule,
    ProductsModule
  ],
})
export class AppModule {}
