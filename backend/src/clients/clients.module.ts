import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { IsValidPhoneConstraint } from './decorators/IsValidPhone';

@Module({
  providers: [ClientsService, IsValidPhoneConstraint],
  controllers: [ClientsController]
})
export class ClientsModule {}
