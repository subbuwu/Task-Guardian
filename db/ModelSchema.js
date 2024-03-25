import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Manager', 'User'],
    required: true
  }
});

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completed: {
    type: Boolean,
    required: false,
  }
});

export const User = mongoose.model('User', UserSchema);
export const Task = mongoose.model('Task', TaskSchema);


