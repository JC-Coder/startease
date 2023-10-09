import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/v1/user/user.module';
import { DatabaseModule } from './module/v1/database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
