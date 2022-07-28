const { pokemonTable } = require("../../Constants");
const showDatabyPartitionKey = require("../../Service/DatabaseService");

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
  
async function showAllPokemonData(TableName, pkValue){
  const result = await showDatabyPartitionKey(TableName,pkValue);
  return result.Items[0]
}

module.exports = showAllPokemonData;