const pokemonTable = require("./Schema");
const apiConstants = require("./ApiConstants");

module.exports = {
  ...pokemonTable,
  ...apiConstants
};