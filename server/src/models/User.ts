import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  color: String,
  desc: String,
});

export type UserDocument = Document & {
  username: string;
  email: string;
  googleId: string;
  books: Array<Array<typeof bookSchema>>;
};

const userSchema = new Schema<UserDocument>({
  username: String,
  email: String,
  googleId: String,
  books: [[bookSchema]],
});

export default mongoose.model<UserDocument>("User", userSchema);
