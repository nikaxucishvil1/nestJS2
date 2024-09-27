import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;
  @Prop()
  age: number;
  @Prop({ unique: true })
  email: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ])
  expenses: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
