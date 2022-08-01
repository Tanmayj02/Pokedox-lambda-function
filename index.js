const { HTTP_PATHS, HTTP_STATUS } = require("./src/Constants/index");
const getPokemon = require("./src/Handler/Pokemon");


exports.handler = async (event, context) => {
try {
    let responseBody;
        switch (true) {
                case event.resource === HTTP_PATHS.pokemonById:
                if(event.httpMethod === 'POST'){
                //responseBody = await putPokemon(event.body);
                }
                if(event.httpMethod === 'GET'){
                responseBody = await getPokemon(event.pathParameters.id);    
                }
                break;
                case event.resource === HTTP_PATHS.pokemon:
                responseBody = await getPokemon();
                break;
                case event.resource === HTTP_PATHS.ability:
                //responseBody = await showAllPokemonData('Ability');
                break;
                case event.resource === HTTP_PATHS.abilityById:
                //responseBody = await showAllPokemonData('Pokemon');
                break;
                default:
                responseBody = "error";     
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
