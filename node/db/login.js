const knex = require('./connection');

module.exports = {

	get: function() {
	return knex('customer');
  	},
	getEmail: function(email) {
    return knex('customer').where('email_customer',email).first();
	}

}
