import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },

  // Ambulance-specific fields
  driverName: String,
  ambulanceNumber: String,

  // Hospital-specific fields
  hospitalName: String,
  hospitalAddress: String,
});

const User = mongoose.model('User', userSchema);
export default User;
