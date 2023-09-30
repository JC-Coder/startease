export const AppModuleContent =  `
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/v1/user/user.module';
{{new_modules_path}}

@Module({
  imports: [UserModule, {{new_modules}}],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`