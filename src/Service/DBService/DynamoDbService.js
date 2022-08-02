const AWS = require("aws-sdk");
const { buildSortKey } = require("../../Utils");
const docClient = new AWS.DynamoDB.DocumentClient();

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

async function deleteItemFromTable(tableName, pk, sk) {

  try {
    var params = {
      TableName: tableName,
       Key: {
           "pk": pk,
           "sk": sk, 
        },
    }
  
    await docClient.delete(params).promise();

    return "item Successfully deleted";
  } catch (err) {
    return err;
  }
}

const findAndDeleteItemFromTable = async(model,identifier) => {
    const data = await read(model,identifier);
    const {pk, sk} = data.Items;
    return await deleteItemFromTable('Pokedex',pk,sk)
    
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
        const tableItemList = newRowData.map((tableItem) => {
          const pk = model.name;
          const sk = buildSortKey(tableItem.username,tableItem.id);
          tableItem.pk = pk;
          tableItem.sk = sk;
          return tableItem;});

        tableItemList.map(singleItem => await putItemInTheTable('Pokedex',singleItem));
        return 'Post multiple Item Succesfull';
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
            return "Enter valid input for Read operation";
      }
      return 'Done';
  }
  
  const update = () => {
      
  }
  
  const deleteItem = async (model, rowDataToDelete) => {
      
    switch(true){
      case rowDataToDelete === undefined:
          // error invalid input parameter
          return 'Enter valid ${model.name} values';
          break;
      case Array.isArray(newRowData):
          // map over the input 
          break;
      default:
          // put single items into the table    
          const identifier = rowDataToDelete.id;
          const result = await findAndDeleteItemFromTable(model,identifier);
          return result
    }
  }



module.exports = { put, read, update, deleteItem };
