const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require ('./users.model');
db.role = require ('./role.model');
db.foods = require('./food.model');
db.orders = require('./order.model');
db.ROLES = ['user', 'admin'];


module.exports = db;
