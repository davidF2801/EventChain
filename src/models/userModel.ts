import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface to describe the properties that a User Document has
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  salt: string;
  roles: string[];
  profilePictureUrl: string; // URL or relative path to the profile picture stored locally or externally
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schema to define the structure of the document in MongoDB
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: false },
  roles: [{ type: String }],
  profilePictureUrl: { type: String, required: false }, // Optional field for URL or relative path to profile picture
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Pre-save hook to hash password before saving the user document
UserSchema.pre<IUser>('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Hash the password with a salt
  this.salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, this.salt);
  next();
});

// Method to compare candidate passwords with the user's hashed password
// UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// Creating the model from the schema
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
