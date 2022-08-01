const pokemonSchema = {
    abilities: "",
    baseExperience: "",
    height: "",
    id: "",
    name: "",
    sprites: "",
    stats: "",
    types: "",
    weight: "",
  }

const abilitySchema = {
    effect_entries: "",
    id: "",
    name: "",
    pokemon: "",
  }

const typeSchema = {
    id: "",
    name: "",
    pokemon: "",
  }

const Models = {
  Pokemon: {
    name: "pokemon",
    dynamo: { pk: "", sk: "" },
    schema: pokemonSchema,
  },
  ability: {
    name: "ability",
    dynamo: { pk: "", sk: "" },
    schema: abilitySchema,
  },
  type: {
    name: "type",
    dynamo: { pk: "", sk: "" },
    schema: typeSchema,
  },

};

module.exports = {
  Models
};
