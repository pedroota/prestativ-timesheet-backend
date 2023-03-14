import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IBusiness {
  nameBU: string;
  relUser: mongoose.Schema.Types.ObjectId;
  createdAt: number;
  updatedAt: number;
}

const BusinessSchema = new Schema<IBusiness>({
  nameBU: {
    type: String,
    required: true,
  },
  relUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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

const Business = mongoose.model<IBusiness>("Business", BusinessSchema);

module.exports = Business;
