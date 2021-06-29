'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Heros extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate() {
			// define association here
		}
	}
	Heros.init(
		{
			name: DataTypes.STRING,
			age: DataTypes.INTEGER,
			superPower: DataTypes.STRING,
			isAlive: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Heros',
		}
	);
	return Heros;
};
