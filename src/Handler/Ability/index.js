const databaseService = require('../../Service/DBService')
const {Models} = require('../../Constants')

const getAbility = async (id) => {
  const CurrentModel = Models.ability;
  return await databaseService.read(CurrentModel,id);
}

module.exports = getAbility