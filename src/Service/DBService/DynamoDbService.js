const AWS = require("aws-sdk");
const { buildSortKey } = require("../../Utils");
const docClient = new AWS.DynamoDB.DocumentClient();
  
// dbService.put(model,, config newData)
// dbService.read(model,) // get all
// dbService.read(model[id, id ]) // get by ids
// dbService.delete(model,id) // delete


//Read 1
async function getDatabyPartitionKey(TableName, pkValue) {
  try {
    var params = {
      TableName: TableName,
      KeyConditionExpression: "pk = :hkey",
      ExpressionAttributeValues: {
        ":hkey": pkValue,
      },
    };
    const data = await docClient.query(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

// Read 2
async function getDatabyPartitionKeyAndField(TableName, pkValue, id) {
  try {
    var params = {
      TableName: TableName,
      KeyConditionExpression: "pk = :hkey",
      ExpressionAttributeValues: {
        ":hkey": pkValue,
        ":i": id,
      },
      FilterExpression: 'id = :i or username = :i',
    };
    const data = await docClient.query(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

//Create
async function putItemInTheTable(tableName, newRowData) {

  try {
    const params = {
      TableName: tableName,
      Item: {...newRowData}
    };

    const result = await docClient.put(params).promise();
    return "Post Request Successful";
  } catch (err) {
    return err;
  }
}
  
const put = async (model, newRowData) => {
  // check sk pk  
  // if exist return error item already exist
  // else
  switch(true){
      case newRowData === undefined:
          // error invalid input parameter
          return 'Enter valid ${model.name} values';
          break;
      case Array.isArray(newRowData):
          // map over the input 
          break;
      default:
          // put single items into the table    
          const pk = model.name;
          const sk = buildSortKey(newRowData.username,newRowData.id);
          newRowData.pk = pk;
          newRowData.sk = sk;
          const result = await putItemInTheTable('Pokedex',newRowData);
          return result
  }
}
  
  
  const read = (model, id) => {
    switch(true) {
        case id === undefined:
          // get all items of a model
          return getDatabyPartitionKey('Pokedex',model.name)
          break;
        case Array.isArray(id):
          // get list of items
          break;
        case true:
          // get single pokemon
          return getDatabyPartitionKeyAndField('Pokedex',model.name,id)
          break;
        default:
            // return error enter valid input 
      }
      return 'Done';
  }
  
  const update = () => {
  
  }
  
  const deleteItem = () => {
  
  }



module.exports = { put, read, update, deleteItem };
