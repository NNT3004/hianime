import { Schema, model, Model, Types } from 'mongoose';
import validator from 'validator';
import Post from './Post';

interface IRelation {
  posts: Types.Array<Types.ObjectId>;
}

interface IRelationMethods {}

type RelationModel = Model<IRelation, {}, IRelationMethods>;

const schema = new Schema<IRelation, RelationModel, IRelationMethods>({
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'what is going on'],
    },
  ],
});

schema.pre('findOneAndUpdate', async function (this: any, next) {
  const updatedRelation = this.getUpdate();
  if (updatedRelation && updatedRelation.posts) {
    const posts = updatedRelation.posts;
    const relation = this.getQuery()._id;

    await Post.updateMany({ _id: { $in: posts } }, { relation });

    next();
  } else {
    next();
  }
});

const Relation = model<IRelation, RelationModel>('Relation', schema);

export default Relation;
export { IRelation };
