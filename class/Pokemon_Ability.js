const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('./table_models.js');

class Pokemon_Ability extends Model {
    //
}

Pokemon_Ability.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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