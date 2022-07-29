const { pokemonTable } = require("../../Constants");
const showDatabyPartitionKey = require("../../Service/DatabaseService");
  
async function showAllPokemonData(TableName, pkValue){
  const result = await showDatabyPartitionKey(TableName,pkValue);
  return result.Items
}

module.exports = showAllPokemonData;