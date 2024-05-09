import { Schema, model, Model, Types } from 'mongoose';

interface IComment {
  user: Types.ObjectId;
  episode: Types.ObjectId;
  message: string;
  toComment?: Types.ObjectId;
  upvote: number;
  devote: number;
}

interface ICommentMethods {}

type CommentModel = Model<IComment, {}, ICommentMethods>;

const schema = new Schema<IComment, CommentModel, ICommentMethods>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  episode: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Episode',
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  toComment: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Comment',
  },
  upvote: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  devote: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

const Comment = model<IComment, CommentModel>('Comment', schema);

export default Comment;
export { IComment };
