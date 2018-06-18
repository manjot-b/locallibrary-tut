var Sequelize = require('sequelize');
var config = require('./../config/config.json').development;

sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect
});
module.exports = sequelize;