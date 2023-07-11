'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      })
    }
  }
  SpotImage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    spotId: {
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defautValue: false
    },
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
