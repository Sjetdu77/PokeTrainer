const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('../table/table_models.js');

class Pokemon_Move extends Model {
    //
};

Pokemon_Move.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    english_name: DataTypes.STRING,
    category: DataTypes.ENUM(['Physique', 'Spécial', 'Statut', '???']),
    pp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    power: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    accuracy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    effect: {
        type: DataTypes.STRING,
        allowNull: true
    },
    contact: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    protect: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    magicCoat: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    snatch: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    mirrorMove: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    kingSRock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    touchType: {
        type: DataTypes.ENUM(['Self', 'Ally', 'Choice Another', 'All Foes', 'All In']),
        defaultValue: 'Choice Another'
    }
}, {
    sequelize: dataBaseTable,
    modelName: 'move',
    timestamps: false
});

module.exports = { Pokemon_Move };