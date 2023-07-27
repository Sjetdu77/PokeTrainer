const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('./table_models.js');

class Pokemon_Type extends Model {
    //
};

Pokemon_Type.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    english_name: DataTypes.STRING
}, {
    sequelize: dataBaseTable,
    modelName: 'types',
    timestamps: false
});

module.exports = { Pokemon_Type };