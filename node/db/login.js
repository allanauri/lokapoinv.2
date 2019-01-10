const knex = require('./connection');

module.exports = {

	get: function() {
	return knex('customer');
  	},
	getEmail: function(email) {
    return knex('customer').where('email_customer',email).first();
	},
	create: function(user){
        return knex('customer').insert({email_customer: user.email, fname_customer: user.fname, lname_customer: user.lname, password_customer: user.password}).then(id_customers => {
        return id_customers[0];
        });
	}

}
