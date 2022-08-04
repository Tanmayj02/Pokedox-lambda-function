// Fetch pokemons with id fully ready code with some changes
const https = require('https');
const { Models } = require('../../Constants');
const databaseService = require('../../Service/DBService');

function getDataFromApi(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let rawData = '';

      res.on('data', chunk => {
        rawData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (err) {
          reject(new Error(err));
        }
      });
    });

    req.on('error', err => {
      reject(new Error(err));
    });
  });
}

const fetchPokemon = async() => {
    const currModel = Models.Pokemon;
  try {
    for(let i=1;i<=2;i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    const result1 = await getDataFromApi(url);
    const currId = i.toString();
    const data = {id: currId, username: result1.name};
    const result2 = await databaseService.put(currModel,data);
    }    
    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify('data fetched succesfully from the API'),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};

module.exports = fetchPokemon;