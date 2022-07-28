const { HTTP_PATHS, HTTP_STATUS } = require("./src/Constants/index");
const showAllPokemonData = require("./src/Handler/Pokemon");
const { buildResponse } = require("./src/Utils");
const {pokemonTable} = require("./src/Constants/Schema")

exports.handler = async (event, context) => {
try {
    let responseBody;
        switch (true) {
                case event.resource === HTTP_PATHS.pokemonById:
                responseBody = await queryItem();
                break;
                case event.resource === HTTP_PATHS.pokemon:
                responseBody = await showAllPokemonData(pokemonTable.name, 'Pokemon');
                break;
                default:
                return buildResponse(HTTP_STATUS.CODE_404, "404 path not found");       
        }

        let response = {
            'statusCode': HTTP_STATUS.CODE_200,
            'body': JSON.stringify(responseBody)
        }
        return response;
}
  catch (err) {
    return { error: err }
  }
}
