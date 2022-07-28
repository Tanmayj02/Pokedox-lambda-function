const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
  
  async function showDatabyPartitionKey(TableName, pkValue){
    try {
    var params = {
        TableName: TableName,
        KeyConditionExpression: 'pk = :hkey',
        ExpressionAttributeValues: {
            ':hkey': pkValue,
        }
    };  
    const data = await docClient.query(params).promise()
      return data
    } catch (err) {
      return err
    }
  }

  // const params = {
//   TableName : 'Pokedex_test'
// }

// async function listItems(){
//   try {
//     const data = await docClient.scan(params).promise()
//     return data
//   } catch (err) {
//     return err
//   }
// }

module.exports = showDatabyPartitionKey;