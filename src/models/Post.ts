import { Schema, model, Model, Types } from 'mongoose';
import validator from 'validator';

interface IPost {
  title: string;
  posterVerticalPath: string;
  posterHorizonPath: string;
  description: string;
  type: string;
  airedFrom: string;
  airedTo: string;
  status: string;
  duration: number;
  studioId: Types.ObjectId;
  relationId: Types.ObjectId;
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
  status: {
    type: String,
    enum: [],
    required: [true, 'what is going on'],
  },
  duration: {
    type: Number,
    required: [true, 'what is going on'],
    min: 3,
    max: 300,
  },
  studioId: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
    required: [true, 'what is going on'],
  },
  relationId: {
    type: Schema.Types.ObjectId,
    ref: 'Relation',
    required: [true, 'what is going on'],
  },
});

const Post = model<IPost, PostModel>('Post', schema);

export default Post;
export { IPost };
