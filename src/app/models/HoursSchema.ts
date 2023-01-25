import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IHours {
  initial: number;
  final: number;
  adjustment: number;
  relClient: mongoose.Schema.Types.ObjectId;
  relProject: mongoose.Schema.Types.ObjectId;
  relActivity: mongoose.Schema.Types.ObjectId;
  relUser: mongoose.Schema.Types.ObjectId;
  approvedGP: boolean;
  billable: boolean;
  released: boolean;
  approved: boolean;
  activityDesc: string;
  createdAt: number;
  updatedAt: number;
}

const HoursSchema = new Schema<IHours>({
  initial: {
    type: Number,
    required: true,
  },
  final: {
    type: Number,
    required: true,
  },
  adjustment: {
    type: Number,
  },
  relClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  relProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  relActivity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
  relUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  approvedGP: {
    type: Boolean,
    default: false,
  },
  billable: {
    type: Boolean,
    default: false,
  },
  released: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  activityDesc: {
    type: String,
    required: true,
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

const Hours = mongoose.model<IHours>("Hours", HoursSchema);

module.exports = Hours;
