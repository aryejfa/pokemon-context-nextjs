import {
  LIST_POKEMON,
  DETAIL_POKEMON,
  IMAGE_POKEMON,
  SPECIES_POKEMON,
  URL_POKEMON,
} from "../type/Type";

const listPokemons = (list_pokemons, state) => ({
  ...state,
  list_pokemons,
});

const detailPokemon = (detail_pokemon, state) => ({
  ...state,
  detail_pokemon,
});

const imagePokemon = (image_pokemon, state) => ({
  ...state,
  image_pokemon,
});

const speciesPokemon = (species_pokemon, state) => ({
  ...state,
  species_pokemon,
});

const urlPokemon = (url_pokemon, state) => ({
  ...state,
  url_pokemon,
});

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case LIST_POKEMON:
      return listPokemons(action.list_pokemons, state);
    case DETAIL_POKEMON:
      return detailPokemon(action.detail_pokemon, state);
    case IMAGE_POKEMON:
      return imagePokemon(action.image_pokemon, state);
    case SPECIES_POKEMON:
      return speciesPokemon(action.species_pokemon, state);
    case URL_POKEMON:
      return urlPokemon(action.url_pokemon, state);
    default:
      return state;
  }
};
