import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IProject {
  title: string;
  idClient: mongoose.Schema.Types.ObjectId;
  valueProject: number;
  gpProject: mongoose.Schema.Types.ObjectId;
  description: string;
  createdAt: number;
  updatedAt: number;
  activities: mongoose.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
  },
  idClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  valueProject: {
    type: Number,
  },
  gpProject: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  description: {
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
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
      default: [],
    },
  ],
});

const Project = mongoose.model<IProject>("Project", ProjectSchema);

module.exports = Project;
