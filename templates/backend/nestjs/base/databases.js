export const DATABASE_MODULE = `
import { Module } from '@nestjs/common';
import { ENVIRONMENT } from 'src/common/configs/environment';
{{database_module_import_path}}

@Module({
  imports: [
    {{database_module_config}}
  ],
})
export class DatabaseModule {}
`;

export const MongodbSchema = `
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SampleDocument = Sample & Document;

@Schema({ timestamps: true })
export class Sample {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const SampleSchema = SchemaFactory.createForClass(Sample);
`;

export const MongodbDatabaseConfig = `
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ENVIRONMENT } from 'src/common/configs/environment';

@Module({
  imports: [MongooseModule.forRoot(ENVIRONMENT.DB.URL)],
})
export class DatabaseModule {}
`;
