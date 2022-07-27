const { pokemonTable } = require("../Constants");

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


var params = {
    TableName: pokemonTable.name,
    KeyConditionExpression: 'Field = :hkey and id > :rkey',
    ExpressionAttributeValues: {
      ':hkey': 'Pokemon',
      ':rkey': 23
    }
  };
  
  async function queryItem(){
    try {
      const data = await docClient.query(params).promise()
      return data
    } catch (err) {
      return err
    }
  }

module.exports = queryItem;