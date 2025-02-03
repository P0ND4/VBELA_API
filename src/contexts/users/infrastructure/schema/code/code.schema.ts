import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Code extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  code: string;

  @Prop({ type: Date, default: Date.now, expires: 300 }) 
  createdAt: Date;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
