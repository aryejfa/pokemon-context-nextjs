import React, { createContext, useReducer } from "react";
import { pokemonReducer } from "../reducer/ReducerList";

export default function MyContextProvider({ children }) {
  const ReducerList = () =>
    useReducer(pokemonReducer, {
      list_pokemons: null,
      detail_pokemon: null,
      image_pokemon: null,
      species_pokemon: null,
      url_pokemon: null,
    });

  return (
    <MyContext.Provider
      value={{
        ReducerList
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export const MyContext = createContext();
