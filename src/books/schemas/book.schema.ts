import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String, required: true })
  thumbnail: string;

  @Prop({ type: String, required: true })
  mainText: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: Number })
  sold: number;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt: Date;

  @Prop({ type: Boolean })
  isDeleted: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
