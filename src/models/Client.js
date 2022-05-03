import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true
  },
  rg: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Client', clientSchema)