export const AppModuleContent =  `
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/v1/user/user.module';
{{database_module_path}}

@Module({
  imports: [UserModule, {{database_module}}],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`