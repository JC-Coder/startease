export const DATABASE_MODULE = () => `
import { Module } from '@nestjs/common';
{{database_module_import_path}}

@Module({
  imports: [
    {{database_module_config}}
  ],
})
export class DatabaseModule {}
`