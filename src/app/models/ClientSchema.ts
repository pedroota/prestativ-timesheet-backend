import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IClient {
  code: string;
  name: string;
  cnpj: string;
  cep: string;
  street: string;
  streetNumber: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  createdAt: number;
  updatedAt: number;
  periodIn: number;
  periodUntil: number;
  billingLimit: string;
  payDay: number;
  valueClient: number;
  gpClient: mongoose.Schema.Types.ObjectId;
  projects: mongoose.Types.ObjectId;
}

const ClientSchema = new Schema<IClient>({
  code: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cnpj: {
    type: String,
    required: true,
    trim: true,
  },
  cep: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  streetNumber: {
    type: String,
    trim: true,
  },
  complement: {
    type: String,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
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
  periodIn: {
    type: Number,
    required: true,
  },
  periodUntil: {
    type: Number,
    required: true,
  },
  billingLimit: {
    type: String,
    required: true,
    trim: true,
  },
  payDay: {
    type: Number,
    required: true,
  },
  valueClient: {
    type: Number,
    required: true,
  },
  gpClient: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      default: [],
    },
  ],
  projects: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      default: [],
    },
  ],
});

const Client = mongoose.model<IClient>("Client", ClientSchema);

module.exports = Client;
