import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExampleDocument = Example & Document;

@Schema({ timestamps: true, versionKey: false })
export class Example {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;
}

export const ExampleSchema = SchemaFactory.createForClass(Example);
