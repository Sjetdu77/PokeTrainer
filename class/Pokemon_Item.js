const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('./table_models.js');

class Pokemon_Item extends Model {
    //
};

Pokemon_Item.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    english_name: DataTypes.STRING,
    type: {
        type: DataTypes.ENUM('Objet', 'Balls', 'Lettre', 'Combat', 'Médicament', 'CT/CS', 'Baie', 'Clé', 'Ingrédient'),
        defaultValue: 'Objet'
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sellPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
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
    modelName: 'items',
    timestamps: false
});

module.exports = { Pokemon_Item }