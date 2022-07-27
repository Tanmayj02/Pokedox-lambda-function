const { pokemonTable } = require("./Constants/Schema");

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: pokemonTable,
  KeyConditionExpression: 'Field = :hkey and id > :rkey',
  ExpressionAttributeValues: {
    ':hkey': 'Pokemon',
    ':rkey': 23
  }
};

async function getItem(){
  try {
    const data = await docClient.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

async function queryItem(){
  try {
    const data = await docClient.query(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await queryItem();
    return data;
  } catch (err) {
    return { error: err }
  }
}
