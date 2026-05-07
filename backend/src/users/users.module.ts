import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { IsUniqueEmailConstraint } from './decorators/IsUniqueEmail.decorator';

@Module({
  providers: [UsersService, IsUniqueEmailConstraint],
  controllers: [UsersController],
})
export class UsersModule {}
