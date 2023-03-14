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
  releasedCall: string;
  activityDesc: string;
  createdAt: number;
  updatedAt: number;
}

const HoursSchema = new Schema<IHours>({
  initial: {
    type: Number,
  },
  final: {
    type: Number,
  },
  adjustment: {
    type: Number,
  },
  relClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  relProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  relActivity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },
  relUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  releasedCall: {
    type: String,
  },
  activityDesc: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
});

const Hours = mongoose.model<IHours>("Hours", HoursSchema);

module.exports = Hours;
