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

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
