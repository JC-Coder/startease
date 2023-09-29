
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
