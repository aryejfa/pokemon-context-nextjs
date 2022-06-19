import "react-circular-progressbar/dist/styles.css";
import _ from "lodash";
import { useContext, useEffect } from "react";
import Tabs from "./Tabs";
import BreedingCapture from "./BreedingCapture";
import AbilitiesSprites from "./AbilitiesSprites";
import { MyContext } from "../../../context/store/Context";
import { DETAIL_POKEMON, SPECIES_POKEMON } from "../../../context/type/Type";
import {
  GetPokemon,
  GetPokemonSpecies,
} from "../../../context/actions/PokemonActions";

const PokemonDetail = (props) => {
  const pokemonName = props.data;

  const { ReducerList } = useContext(MyContext);
  const [state, dispatch] = ReducerList();
  const { detail_pokemon, species_pokemon } = state;
  const detailPokemon = (detail_pokemon) => dispatch({ type: DETAIL_POKEMON, detail_pokemon });
  const speciesPokemon = (species_pokemon) => dispatch({ type: SPECIES_POKEMON, species_pokemon });
  
  if (detail_pokemon === "Not Found" && species_pokemon === "Not Found") {
    window.location.href = '/';
  }

  useEffect(() => {
    hitApiDetail(pokemonName);
    hitApiSpecies(pokemonName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hitApiDetail = async (pokemonName) => {
    const dat_arr = await GetPokemon(pokemonName);
    detailPokemon(dat_arr);
  };

  const hitApiSpecies = async (pokemonName) => {
    const dat_arr = await GetPokemonSpecies(pokemonName);
    speciesPokemon(dat_arr);
  };

  const ShowData = () => {
    if (!_.isEmpty(detail_pokemon) && !_.isEmpty(species_pokemon)) {
      const female = (100 / 8) * parseInt(species_pokemon.gender_rate);
      const male = 100 - female;

      return (
        <div className="container mx-auto md:px-12 px-6 pt-2">
          <Tabs
            color="yellow"
            pokeData={detail_pokemon}
            pokeDataSpecies={species_pokemon}
            pokemonName={pokemonName}
          />
          {/* <div className="bg-yellow-400"></div>
          <div className="text-yellow-400"></div> */}
          <BreedingCapture
            pokeDataSpecies={species_pokemon}
            male={male}
            female={female}
          />

          <AbilitiesSprites pokeData={detail_pokemon} />
        </div>
      );
    }
  };

  return (
    <>
      {!_.isEmpty(detail_pokemon) && !_.isEmpty(species_pokemon) && (
        <ShowData />
      )}
    </>
  );
  return <></>;
};

export default PokemonDetail;
