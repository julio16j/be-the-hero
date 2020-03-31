
exports.up = function(knex) {
    const _ong_id = knex.select('id').from('ongs').first();
    return knex('incidents').insert({
      title:'Caso primeira Ong',
      description: 'Esse é o primeiro caso da primeira Ong',
      value: '1',
      ong_id: _ong_id
    });
};

exports.down = function(knex) {
  return knex('incidents').where('id', 1).del();
};
