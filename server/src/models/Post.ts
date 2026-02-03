import mongoose, { Schema } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  creator: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tags: {
      type: [Schema.Types.ObjectId],
      ref: "Tag",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPost>("Post", postSchema);
