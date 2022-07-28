// const { pokemonTable } = require("../Constants");
// const AWS = require('aws-sdk');
// const docClient = new AWS.DynamoDB.DocumentClient();
// const params = {
//   "TableName": "Pokedex",
//   "ScanIndexForward": true,
//   "FilterExpression": "contains(#DYNOBASE_sk, :sk)",
//   "ExpressionAttributeNames": {
//     "#DYNOBASE_sk": "sk"
//   },
//   "ExpressionAttributeValues": {
//     ":sk": "25"
//   },
//   "KeyConditionExpression": []
// };
//   async function queryItem(){
//     try {
//       const data = await docClient.scan(params).promise()
//       return data
//     } catch (err) {
//       return err
//     }
//   }
// module.exports = queryItem;


// using Query
// searching only on PK

// const { pokemonTable } = require("../Constants");
// const AWS = require('aws-sdk');
// const docClient = new AWS.DynamoDB.DocumentClient();
// const params = {
//   "TableName": "Pokedex",
//   KeyConditionExpression : 'pk = :yr',
//   ExpressionAttributeValues: {
//     ':yr': 'Pokemon'
//   }
// };
//   async function queryItem(){
//     try {
//       const data = await docClient.query(params).promise()
//       return data
//     } catch (err) {
//       return err
//     }
//   }
// module.exports = queryItem;


// Clean example of using filter

// const { pokemonTable } = require("../../Constants");
// const AWS = require('aws-sdk');
// const docClient = new AWS.DynamoDB.DocumentClient();
// const params = {
//   "TableName": "Pokedex",
//   KeyConditionExpression : 'pk = :yr ' ,
//   FilterExpression: 'id = :i or contains(username, :i)',
//   ExpressionAttributeValues: {
//     ':yr': 'Pokemon',
//     ':i': 'Pikachu',
//   }
// };
//   async function queryItem(){
//     try {
//       const data = await docClient.query(params).promise()
//       return data
//     } catch (err) {
//       return err
//     }
//   }
// module.exports = queryItem;


const { pokemonTable } = require("../../Constants");

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