const knex = require('./connection');

module.exports = {
  get: function(user){
    return knex('book').where({'id_rumah':user.id_rumah,'tanggal_book':user.tanggal}).first();
  },

  getHouse: function(id){
    return knex('house').where('id_rumah',id).first();
  },

  getAllHouse: function(){
    return knex('house');
  },

  getCatHouse: function(cat){
    return knex('house').where('jenis_rumah',cat)
  }
}
