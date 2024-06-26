import { Schema, model, models } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export type ExtendedImage = IImage & {
  _id: string;
}

const imageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  secureURL: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  config: { type: Object },
  transformationUrl: { type: String },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Image = models?.Image || model("Image", imageSchema);

export default Image;

// https://youtu.be/5cQoGNEcc5Q?si=5KezPeIaAjEeKfRY
// https://youtu.be/R3SYyq2HMOc?si=kwHVQP5o7ouhVVox
// https://youtu.be/uCjcc1TXk5c?si=60v2CyMTUFNITReI
// https://youtu.be/R6oJjjwxL5M?si=VKTlXbjGZsGoLwM5
