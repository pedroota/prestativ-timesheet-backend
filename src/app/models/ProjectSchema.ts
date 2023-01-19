import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IProject {
  title: string;
  idClient: mongoose.Schema.Types.ObjectId;
  valueProject: number;
  gpProject: string;
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
    type: mongoose.Types.ObjectId,
    ref: "Clients",
    required: true,
  },
  valueProject: {
    type: Number,
    required: true,
  },
  gpProject: {
    type: String,
    required: true,
  },
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
