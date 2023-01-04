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
  // deixei esses comentários aqui, porém vão ser deletados assim que eu esclarecer isso com o Pietro ;)
  // DASHBOARD apenas ADM pode visualizar ou outro nivel de usuario também?
  // dúvida para tirar com o pietro: o numero do chamado é unico para cada atividade
  // ou pode ser vário numeros de chamados diferentes conforme as horas são lançadas? ---> CAMPO ABAIXO
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
