import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IClient {
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
  gpClient: string;
}

const ClientSchema = new Schema<IClient>({
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
    required: true,
    trim: true,
  },
  complement: {
    type: String,
    required: true,
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
  gpClient: {
    type: String,
    required: true,
    trim: true,
  },
});

const Client = mongoose.model<IClient>("Client", ClientSchema);

module.exports = Client;
