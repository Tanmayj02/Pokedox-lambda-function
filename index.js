const { HTTP_PATHS, HTTP_STATUS } = require("./src/Constants/index");
const {putPokemon , getPokemon, deletePokemon, updatePokemon} = require("./src/Handler/Pokemon");
const getAbility = require("./src/Handler/Ability");
const fetchPokemon = require("./src/Handler/Pokemon/FetchPokemon");


exports.handler = async (event, context) => {
try {
    let responseBody;
        switch (true) {
                case event.resource === HTTP_PATHS.pokemonById:
                if(event.httpMethod === 'POST'){
                responseBody = await putPokemon(event.body);
                }
                if(event.httpMethod === 'GET'){
                responseBody = await getPokemon(event.pathParameters.id);    
                }
                if(event.httpMethod === 'DELETE'){
                responseBody = await deletePokemon(event.body);    
                }
                if(event.httpMethod === 'PATCH'){
                responseBody = await updatePokemon(event.body);    
                }
                break;
                case event.resource === HTTP_PATHS.pokemon:
                //responseBody = await getPokemon();
                responseBody = await fetchPokemon();
                break;
                case event.resource === HTTP_PATHS.abilityById:
                if(event.httpMethod === 'POST'){
                //responseBody = await putPokemon(event.body);
                }
                if(event.httpMethod === 'GET'){
                responseBody = await getAbility(event.pathParameters.id);    
                }
                break;
                case event.resource === HTTP_PATHS.ability:
                responseBody = await getAbility();
                break;
                default:
                responseBody = "error in index.js";
        }

        const response = {
            'statusCode': HTTP_STATUS.CODE_200,
            'body': JSON.stringify(responseBody)
        }
        return response;
}
  catch (err) {
    return { error: err }
  }
}
