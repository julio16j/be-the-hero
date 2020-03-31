const generateUniqueId = require('../../utils/generateUniqueId')
const newId = generateUniqueId();
exports.up = function(knex) {
  return knex('ongs').insert({
    id: newId,
    name: 'Primeira Ong',
    email: 'primeira@ong.com',
    whatsapp: '5583911114444',
    city: 'João Pessoa',
    uf: 'PB'
  })
};

exports.down = function(knex) {
  return knex('ongs').where('id', newId).del();
};
