import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  id: string;

  @Prop({
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    index: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
