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
  closedScope: boolean;
  billable: boolean;
  released: boolean;
  approved: boolean;
  callNumber: string;
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
    type: mongoose.Schema.Types.String,
    ref: "Client",
    required: true,
  },
  relProject: {
    type: mongoose.Schema.Types.String,
    ref: "Project",
    required: true,
  },
  relActivity: {
    type: mongoose.Schema.Types.String,
    ref: "Activity",
    required: true,
  },
  relUser: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
  closedScope: {
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
  callNumber: {
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