import _, { isEqual } from "lodash";
import { useContext, useEffect, useRef } from "react";
import Abilities from "./Abilities";
import Evolution from "./Evolution";
import Weeknesses from "./Weeknesses";
import { MyContext } from "../../../context/store/Context";
import { URL_POKEMON } from "../../../context/type/Type";
import { GetPokemonUrl } from "../../../context/actions/PokemonActions";

const PokemonUrlDetail = ({ data, categories }) => {
  const pokemonNameUrl = data;

  const { ReducerList } = useContext(MyContext);
  const [state, dispatch] = ReducerList();
  const { url_pokemon } = state;
  const urlPokemon = (url_pokemon) => dispatch({ type: URL_POKEMON, url_pokemon });
  const checkTot = useRef(5);

  useEffect(() => {
    hitApiDetail(pokemonNameUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hitApiDetail = async (pokemonNameUrl) => {
    const dat_arr = await GetPokemonUrl(pokemonNameUrl);
    urlPokemon(dat_arr);
  };

  const ShowData = () => {
    if (!_.isEmpty(url_pokemon)) {
      const checkTotDiv = 5;
      if (categories === "evolution") {
        checkTotDiv = checkTot.current = 1;
        if (!isEqual(url_pokemon.chain.evolves_to[0])) {
          checkTotDiv = checkTot.current = 3;
          if (!isEqual(url_pokemon.chain.evolves_to[0].evolves_to[0])) {
            checkTotDiv = checkTot.current = 5;
          }
        }
      }

      return categories === "abilities" ? (
        <Abilities pokeData={url_pokemon} />
      ) : categories === "weeknesses" ? (
        <Weeknesses pokeData={url_pokemon} />
      ) : categories === "evolution" ? (
        <Evolution pokeData={url_pokemon} checkTotDiv={checkTotDiv} />
      ) : null;
    }
  };

  return <div className="">{!_.isEmpty(url_pokemon) && <ShowData />}</div>;
};

export default PokemonUrlDetail;
