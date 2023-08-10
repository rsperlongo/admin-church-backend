import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = Document<UserDocument>;

@Schema()
export class User {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'id' }] })
  id: User;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
