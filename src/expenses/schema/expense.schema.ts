import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Expense {
  @Prop()
  despription: string;
  @Prop()
  amount: number;
  @Prop()
  category: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
