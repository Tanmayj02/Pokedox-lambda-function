// const { pokemonTable } = require("../../Constants");
// const {
//   showDatabyPartitionKey,
//   putItemInTheTable,
// } = require("../../Service/DatabaseService");
// const { buildSortKey } = require("../../Utils/index");

// const CurrentModel = Models.Pokemon

// async function showAllPokemonData(TableName, pkValue) {
//   const result = await showDatabyPartitionKey(TableName, pkValue);
//   return result.Items;
// }

// async function putSinglePokemon(newRowData) {

//   const pk = "pokemon";
//   const sk = await buildSortKey(id, username);

//   await DbService.create(CurrentModel,newRowData)
//   // await putItemInTheTable(CurrentModel,newRowData)
//   const result = await putItemInTheTable(
//     pokemonTable.name,
//     pk,
//     sk,
//     username,
//     id
//   );
// }

// async function putPokemon(body) {
//   const inputBody = JSON.parse(body);

//   if (Array.isArray(inputBody) && inputBody.length > 0) {

//     const batchWrite = inputBody.map((item) =>
//       putSinglePokemon(item.username, item.id)
//     );

//     return await Promise.all(batchWrite);
//   } else {
//     const result = await putSinglePokemon(inputBody.username, inputBody.id);
//   }
//   return inputBody.length;
// }

// module.exports = { showAllPokemonData, putPokemon };


const databaseService = require('../../Service/DBService')
const {Models} = require('../../Constants')

const getPokemon = async (id) => {
  const CurrentModel = Models.Pokemon;
  return await databaseService.read(CurrentModel,id);
}

module.exports = getPokemon