const knex = require('./connection');

module.exports = {

	get: function() {
	return knex('customer');
  	},
	getId: function(id) {
		return knex('customer').where('id_customer',id).first();
	},
	getEmail: function(email) {
    return knex('customer').where('email_customer',email).first();
	},
	create: function(user){
        return knex('customer').insert({email_customer: user.email, fname_customer: user.fname, lname_customer: user.lname, password_customer: user.password}).then(id_customers => {
        return id_customers[0];
        });
	},
	update: function(user){
		return knex('customer').update({nama_customer: user.username,email_customer: user.email,ttl_customer: user.date,telp_customer: user.phone}).where('id_customer',user.id);
	}

}
