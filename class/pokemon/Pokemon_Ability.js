const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('../table/table_models.js');

class Pokemon_Ability extends Model {
    //
}

Pokemon_Ability.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    english_name: DataTypes.STRING,
    effectOnBattle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    effectOutOfBattle: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    sequelize: dataBaseTable,
    modelName: 'abilities',
    timestamps: false
});

module.exports = { Pokemon_Ability };