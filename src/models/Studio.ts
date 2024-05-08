import { Schema, model, Model, Types } from 'mongoose';
import validator from 'validator';

interface IStudio {
  name: string;
  description: string;
}

interface IStudioMethods {}

type StudioModel = Model<IStudio, {}, IStudioMethods>;

const schema = new Schema<IStudio, StudioModel, IStudioMethods>({
  name: {
    type: String,
    required: [true, 'what is going on'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'what is going on'],
    minlength: 32,
    maxlength: 1024,
    trim: true,
  },
});

const Studio = model<IStudio, StudioModel>('Studio', schema);

export default Studio;
export { IStudio };
