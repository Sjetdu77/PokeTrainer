const { DataTypes, Op }     = require('sequelize');
const { Pokemon_Creature }  = require('./class/Pokemon_Creature');
const { Pokemon_Specie }    = require('./class/Pokemon_Specie');
const { Pokemon_Trainer }   = require('./class/Pokemon_Trainer');
const { Pokemon_Move }      = require('./class/Pokemon_Move');
const { Pokemon_Ability }   = require('./class/Pokemon_Ability');
const { Pokemon_Type }      = require('./class/Pokemon_Type');
const { Pokemon_Item }      = require('./class/Pokemon_Item');
const { Pokemon_Form }      = require('./class/Pokemon_Form');
const { dataBaseTable }     = require('./class/table_models');

const specie_evolution = dataBaseTable.define('specie_evolution', {
    conditions: DataTypes.JSON
}, {
    timestamps: false
});

const resistances = dataBaseTable.define('resistances', {
    type: DataTypes.ENUM('immune', 'resist', 'weak')
}, { timestamps: false });

const abilities_species = dataBaseTable.define('abilities_species', {
    secret: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, { timestamps: false });

const moves_species = dataBaseTable.define('moves_species', {
    level: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, { timestamps: false });

Pokemon_Trainer.Team        = Pokemon_Trainer.hasMany(Pokemon_Creature, { foreignKey: { allowNull: true, name: 'team' } });
Pokemon_Creature.Trainer    = Pokemon_Creature.belongsTo(Pokemon_Trainer, { foreignKey: { allowNull: true, name: 'team' } });

Pokemon_Creature.Ability    = Pokemon_Creature.belongsTo(Pokemon_Ability);
Pokemon_Ability.Creatures   = Pokemon_Ability.hasMany(Pokemon_Creature);

Pokemon_Creature.Held       = Pokemon_Creature.belongsTo(Pokemon_Item, { foreignKey: { allowNull: true, name: 'held' } });
Pokemon_Item.Creatures      = Pokemon_Item.hasMany(Pokemon_Creature);

Pokemon_Specie.Forms        = Pokemon_Specie.hasMany(Pokemon_Form);
Pokemon_Form.Species        = Pokemon_Form.belongsTo(Pokemon_Specie);

Pokemon_Form.Type           = Pokemon_Form.belongsToMany(Pokemon_Type, { through: 'types_species', timestamps: false });
Pokemon_Type.Species        = Pokemon_Type.belongsToMany(Pokemon_Form, { through: 'types_species', timestamps: false });

Pokemon_Specie.Abilities    = Pokemon_Specie.belongsToMany(Pokemon_Ability, { through: abilities_species });
Pokemon_Ability.Species     = Pokemon_Ability.belongsToMany(Pokemon_Specie, { through: abilities_species });

Pokemon_Form.Moves          = Pokemon_Form.belongsToMany(Pokemon_Move, { through: moves_species });
Pokemon_Move.Species        = Pokemon_Move.belongsToMany(Pokemon_Form, { through: moves_species });

Pokemon_Trainer.Inventory   = Pokemon_Trainer.belongsToMany(Pokemon_Item, { through: 'inventories', timestamps: false });
Pokemon_Item.Trainers       = Pokemon_Item.belongsToMany(Pokemon_Trainer, { through: 'inventories', timestamps: false });

Pokemon_Move.Type           = Pokemon_Move.belongsTo(Pokemon_Type);
Pokemon_Type.Moves          = Pokemon_Type.hasMany(Pokemon_Move);

Pokemon_Creature.Form       = Pokemon_Creature.belongsTo(Pokemon_Form);
Pokemon_Form.Creatures      = Pokemon_Form.hasMany(Pokemon_Creature);


Pokemon_Form.Evolution      = Pokemon_Form.belongsToMany(Pokemon_Form, { as: 'evolutions', through: specie_evolution });
Pokemon_Type.Resistance     = Pokemon_Type.belongsToMany(Pokemon_Type, { as: 'resistance', through: resistances });



async function synchronize(restart = false) {
    await dataBaseTable.sync();

    if (!restart) {
        await Pokemon_Creature.destroy({ where: {
            [Op.or]: [
                { team: null },
                { place: 'wild' }
            ]
        }});
    }
}

module.exports = {
    Pokemon_Specie,
    Pokemon_Trainer,
    Pokemon_Creature,
    Pokemon_Move,
    Pokemon_Ability,
    Pokemon_Type,
    Pokemon_Item,
    Pokemon_Form,
    synchronize
};