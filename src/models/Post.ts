import { Schema, model, Model, Types } from 'mongoose';
import validator from 'validator';

interface IPost {
  title: string;
  posterVerticalPath: string;
  posterHorizonPath: string;
  description: string;
  type: string;
  airedFrom: Date;
  airedTo: Date;
  status: string;
  duration: number;
  studio: Types.ObjectId;
  relation?: Types.ObjectId;
}

interface IPostMethods {}

type PostModel = Model<IPost, {}, IPostMethods>;

const schema = new Schema<IPost, PostModel, IPostMethods>({
  title: {
    type: String,
    required: [true, 'and i said hey'],
    minlength: 3,
    maxlength: 40,
    trim: true,
  },
  posterVerticalPath: {
    type: String,
    required: [true, 'what is going on'],
    validate: [validator.isURL, 'and i try'],
  },
  posterHorizonPath: {
    type: String,
    required: [true, 'what is going on'],
    validate: [validator.isURL, 'and i try'],
  },
  description: {
    type: String,
    required: [true, 'what is going on'],
    minlength: 32,
    maxlength: 1024,
    trim: true,
  },
  type: {
    type: String,
    enum: ['TV', 'Movie', 'ONA', 'OVA'],
    required: [true, 'what is going on'],
  },
  airedFrom: {
    type: Date,
    required: [true, 'what is going on'],
  },
  airedTo: {
    type: Date,
    required: [true, 'what is going on'],
  },
  status: {
    type: String,
    enum: ['Currently Airing'],
    required: [true, 'what is going on'],
  },
  duration: {
    type: Number,
    required: [true, 'what is going on'],
    min: 3,
    max: 300,
  },
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
    required: [true, 'what is going on'],
  },
  relation: {
    type: Schema.Types.ObjectId,
    ref: 'Relation',
  },
});

const Post = model<IPost, PostModel>('Post', schema);

export default Post;
export { IPost };
