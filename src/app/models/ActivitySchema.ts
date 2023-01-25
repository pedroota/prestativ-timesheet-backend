import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IActivity {
  title: string;
  project: mongoose.Schema.Types.ObjectId;
  valueActivity: number;
  gpActivity: mongoose.Schema.Types.ObjectId;
  description: string;
  users: mongoose.Schema.Types.ObjectId;
  closedScope: boolean;
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  closedScope: {
    type: Boolean,
    default: false,
  },
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
