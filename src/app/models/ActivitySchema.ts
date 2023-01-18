import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IActivity {
  title: string;
  project: mongoose.Schema.Types.ObjectId;
  valueActivity: number;
  gpActivity: string;
  description: string;
  users: mongoose.Schema.Types.ObjectId;
  createdAt: number;
  updatedAt: number;
}

const ActivitySchema = new Schema<IActivity>({
  title: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  valueActivity: {
    type: Number,
  },
  gpActivity: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
  },
});

const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);

module.exports = Activity;
