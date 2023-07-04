const { DataTypes, Op }     = require('sequelize');
const { Pokemon_Creature }  = require('./class/Pokemon_Creature');
const { Pokemon_Specie }    = require('./class/Pokemon_Specie');
const { Pokemon_Trainer }   = require('./class/Pokemon_Trainer');
const { Pokemon_Move }      = require('./class/Pokemon_Move');
const { Pokemon_Ability }   = require('./class/Pokemon_Ability');
const { Pokemon_Type }      = require('./class/Pokemon_Type');
const { Pokemon_Item }      = require('./class/Pokemon_Item');
const { dataBaseTable }     = require('./class/table_models');

const specie_evolution = dataBaseTable.define('specie_evolution', {
    origin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    conditions: {
        type: DataTypes.RANGE(DataTypes.STRING),
        allowNull: true
    }
}, { timestamps: false });

const originForm = dataBaseTable.define('forms', {
    origin: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, { timestamps: false });

const resistances = dataBaseTable.define('resistances', {
    type: {
        type: DataTypes.ENUM('immune', 'resists'),
        defaultValue: 'resist'
    }
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

const specie_origin = dataBaseTable.define('specie_origins', {}, { timestamps: false });
const ability_creatures = dataBaseTable.define('ability_creatures', {}, { timestamps: false });
const types_species = dataBaseTable.define('types_species', {}, { timestamps: false });
const item_held = dataBaseTable.define('item_held', {}, { timestamps: false });
const inventories = dataBaseTable.define('inventories', {}, { timestamps: false });
const type_moves = dataBaseTable.define('type_moves', {}, { timestamps: false });

Pokemon_Trainer.Team        = Pokemon_Trainer.hasMany(Pokemon_Creature, { foreignKey: { allowNull: true, name: 'team' } });
Pokemon_Creature.Trainer    = Pokemon_Creature.belongsTo(Pokemon_Trainer, { foreignKey: { allowNull: true, name: 'team' } });

Pokemon_Specie.Creatures    = Pokemon_Specie.hasMany(Pokemon_Creature);
Pokemon_Creature.Specie     = Pokemon_Creature.belongsTo(Pokemon_Specie);

Pokemon_Creature.Ability    = Pokemon_Creature.hasOne(Pokemon_Ability);
Pokemon_Ability.Creatures   = Pokemon_Ability.belongsToMany(Pokemon_Creature, { through: ability_creatures });

Pokemon_Creature.Held       = Pokemon_Creature.hasOne(Pokemon_Item, { foreignKey: { allowNull: true, name: 'held' } });
Pokemon_Item.Creatures      = Pokemon_Item.belongsToMany(Pokemon_Creature, { through: item_held });

Pokemon_Specie.Origin       = Pokemon_Specie.belongsToMany(originForm, { through: specie_origin, as: 'origin' });
originForm.Species          = originForm.belongsToMany(Pokemon_Specie, { through: specie_origin });

Pokemon_Specie.Type         = Pokemon_Specie.belongsToMany(Pokemon_Type, { through: types_species });
Pokemon_Type.Species        = Pokemon_Type.belongsToMany(Pokemon_Specie, { through: types_species });

Pokemon_Specie.Abilities    = Pokemon_Specie.belongsToMany(Pokemon_Ability, { through: abilities_species });
Pokemon_Ability.Species     = Pokemon_Ability.belongsToMany(Pokemon_Specie, { through: abilities_species });

Pokemon_Specie.Moves        = Pokemon_Specie.belongsToMany(Pokemon_Move, { through: moves_species });
Pokemon_Move.Species        = Pokemon_Move.belongsToMany(Pokemon_Specie, { through: moves_species });

Pokemon_Trainer.Inventory   = Pokemon_Trainer.belongsToMany(Pokemon_Item, { through: inventories });
Pokemon_Item.Trainers       = Pokemon_Item.belongsToMany(Pokemon_Trainer, { through: inventories });

Pokemon_Move.Type           = Pokemon_Move.hasOne(Pokemon_Type);
Pokemon_Type.Moves          = Pokemon_Type.belongsToMany(Pokemon_Move, { through: type_moves });


Pokemon_Specie.Evolution    = Pokemon_Specie.belongsToMany(Pokemon_Specie, { as: 'evolutions', through: specie_evolution });
Pokemon_Type.Resistance     = Pokemon_Type.belongsToMany(Pokemon_Type, { as: 'resistance', through: resistances });



async function synchronize(restart = false) {
    await Pokemon_Specie.sync();
    await Pokemon_Creature.sync();
    await Pokemon_Trainer.sync();
    await Pokemon_Move.sync();
    await Pokemon_Ability.sync();
    await Pokemon_Type.sync();
    await Pokemon_Item.sync();

    await specie_evolution.sync();
    await originForm.sync();
    await specie_origin.sync();
    await resistances.sync();
    await abilities_species.sync();
    await moves_species.sync();
    await ability_creatures.sync();
    await types_species.sync();
    await item_held.sync();
    await inventories.sync();
    await type_moves.sync();

    if (!restart) {
        await Pokemon_Creature.destroy({ where: {
            [Op.or]: [
                { team: null },
                { place: 'wild' }
            ]
        }});
    
        const allTrainers = await Pokemon_Trainer.findAll();
        for (const trainer of allTrainers) {
            const creatures = await trainer.getCreatures();
            if (creatures.length === 0) {
                trainer.destroy();
            }
        }
    }
}

module.exports = { Pokemon_Specie, Pokemon_Trainer, Pokemon_Creature, originForm, synchronize };