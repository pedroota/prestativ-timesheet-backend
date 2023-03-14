import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ILogs {
  name: string;
  surname: string;
  role: mongoose.Schema.Types.ObjectId;
  action: string;
  createdAt: number;
  updatedAt: number;
}

const LogsSchema = new Schema<ILogs>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  action: {
    type: String,
    required: true,
    trim: true,
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

const Log = mongoose.model<ILogs>("Log", LogsSchema);

module.exports = Log;
