import Client from '../models/Client'

import { encryptData, decryptData } from '../services/auth'

class ClientsController {
  async index(req, res) {
    try {
      const clients = await Client.find()
      return res.json(clients)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async indexDecript(req, res) {
    try {
      const clients = await Client.find()

      const clientsDecripted = await Promise.all(clients.map(async(item) => {
        const { _id, name, cpf, rg } = item

        const dName = await decryptData(name)
        const dCpf = await decryptData(cpf)
        const dRg = await decryptData(rg)

        return {
          _id,
          dName,
          dCpf,
          dRg
        }
      }))

      return res.json(clientsDecripted)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async create(req, res) {
    try {
      const { name, cpf, rg } = req.body

      const encryptedName = await encryptData(name)
      const encryptedCpf = await encryptData(cpf)
      const encryptedRg = await encryptData(rg)

      const client = await Client.findOne({ cpf: encryptedCpf })

      if (client) {
        return res
          .status(422)
          .json({ message: `client ${cpf} already exists` })
      }

      const newclient = await Client.create({ name: encryptedName, cpf: encryptedCpf, rg: encryptedRg })

      return res.status(201).json(newclient)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: "Internal server error." })
    }
  }

  async destroy(req, res) {
    try {
      const { client_id } = req.params
      const client = await Client.findById(client_id)

      if (!client) {
        return res.status(404).json()
      }

      await Client.deleteOne()

      return res.status(200).json()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: "Internal server error." })
    }
  }
}

export default new ClientsController()