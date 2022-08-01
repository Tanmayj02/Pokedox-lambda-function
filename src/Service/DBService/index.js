const { put, read, update, deleteItem  } = require('./DynamoDbService');

const databaseService = {
    put,
    read,
    update,
    deleteItem
}

module.exports = databaseService
