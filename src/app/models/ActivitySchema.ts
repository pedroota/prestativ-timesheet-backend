import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IActivity {
  title: string;
  project: mongoose.Schema.Types.ObjectId; // qual é o tipo adequado???????????????????????
  valueActivity: number;
  gpActivity: string;
  callNumber: string;
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
  callNumber: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
});

const Activity = mongoose.model<IActivity>("Activity", ActivitySchema);

module.exports = Activity;
