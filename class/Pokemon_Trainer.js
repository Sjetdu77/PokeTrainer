const { DataTypes, Model } = require('sequelize');
const { dataBaseTable } = require('./table_models.js');

class Pokemon_Trainer extends Model {
    getDatasFromTrainer() {
        return {
            getLuckyEgg: this.getLuckyEgg,
            getExpCharm: this.getExpCharm
        }
    }
}

Pokemon_Trainer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: DataTypes.ENUM('Garçon', 'Fille', '?'),
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    yens: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    origins: {
        type: DataTypes.STRING,
        defaultValue: 'Inconnu'
    },
}, {
    sequelize: dataBaseTable,
    modelName: 'trainer'
});

module.exports = {
    Pokemon_Trainer
}