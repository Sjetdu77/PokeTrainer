const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('./table_models.js');

class Pokemon_Form extends Model {};

Pokemon_Form.init({
    name: {
        type: DataTypes.STRING,
        defaultValue: 'Base'
    },
    english_name: {
        type: DataTypes.STRING,
        defaultValue: 'Base'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    origin: DataTypes.STRING,
    baseStats: {
        type: DataTypes.JSON,
        allowNull: true
    },
    baseXP: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    EVAdd: {
        type: DataTypes.JSON,
        allowNull: true
    },
}, {
    sequelize: dataBaseTable,
    modelName: 'forms',
    timestamps: false
});

module.exports = { Pokemon_Form };