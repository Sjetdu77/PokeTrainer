const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('./table_models.js');

class Pokemon_Item extends Model {
    //
};

Pokemon_Item.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.ENUM('Objet', 'Balls', 'Lettre', 'Combat', 'Médicament', 'CT/CS', 'Baie', 'Clé', 'Ingrédient'),
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sellPrice: DataTypes.INTEGER,
    buyable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sellable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    bagEffect: {
        type: DataTypes.STRING,
        allowNull: true
    },
    heldEffect: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: dataBaseTable,
    modelName: 'items'
});

module.exports = { Pokemon_Item }