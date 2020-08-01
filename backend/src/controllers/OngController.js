const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  async create(request, response) {
    const {name, email, whatsapp, city, uf} = request.body
  
    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.status(201).json({ id });
  },
  async index(noData, response){
      const ongs = await connection('ongs').select('*')
    
      return response.json(ongs);
  }
};