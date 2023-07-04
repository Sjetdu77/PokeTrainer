const typesEN = [
	'???', 'Normal', 'Fire', 'Fighting', 'Water', 'Flying', 'Grass', 'Poison',
	'Electric', 'Ground', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark',
	'Steel', 'Fairy'
];
const typesFR = [
	'???', 'Normal', 'Feu', 'Combat', 'Eau', 'Vol', 'Plante', 'Poison', 'Electrik',
	'Sol', 'Psy', 'Roche', 'Glace', 'Insecte', 'Dragon', 'Spectre', 'Ténèbres', 'Acier',
	'Fée'
];

const convertTypes = {
    '???': '???',
    'Normal': 'Normal',
    'Fire': 'Feu',
    'Fighting': 'Combat',
    'Water': 'Eau',
    'Flying': 'Vol',
    'Grass': 'Plante',
    'Poison': 'Poison',
    'Electric': 'Electrik',
    'Ground': 'Sol',
    'Psychic': 'Psy',
    'Rock': 'Roche',
    'Ice': 'Glace',
    'Bug': 'Insecte',
    'Dragon': 'Dragon',
    'Ghost': 'Spectre',
    'Dark': 'Ténèbres',
    'Steel': 'Acier',
    'Fairy': 'Fée'
};

const convertItems = {
    'Item': 'Objet',
    'Balls': 'Balls',
    'Mail': 'Lettre',
    'Battle': 'Combat',
    'Medicine': 'Médicament',
    'TM/HM': 'CT/CS',
    'Berry': 'Baie',
    'Key': 'Clé',
    'Ingredient': 'Ingrédient'
}

module.exports = { typesEN, typesFR, convertTypes, convertItems };