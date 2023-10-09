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

export const TypeOrmDatabaseModule = `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENVIRONMENT } from 'src/common/configs/environment';

// At your terminal run: docker-compose up to start your database server 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: ENVIRONMENT.DB.HOST || 'localhost',
      port: 5435,
      database: ENVIRONMENT.DB.DATABASE || 'startease',
      username: ENVIRONMENT.DB.USER || 'root',
      password: ENVIRONMENT.DB.PASSWORD || '123',
      autoLoadEntities: true,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true, // when production set to false
    })
  ]
})

export class DatabaseModule {}
`;

export const TypeOrmAbstractDocument = `
import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
`;
export const TypeOrmEntity = `
import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class User extends AbstractEntity<User> {

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
`;