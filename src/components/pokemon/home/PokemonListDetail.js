import _ from "lodash";
import { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GetPokemon } from "../../../context/actions/PokemonActions";
import { MyContext } from "../../../context/store/Context";
import { DETAIL_POKEMON } from "../../../context/type/Type";

const PokemonList = ({ data }) => {
  const pokemonName = data;
  const { ReducerList } = useContext(MyContext);
  const [state, dispatch] = ReducerList();
  const { detail_pokemon } = state;
  const detailPokemon = (detail_pokemon) => dispatch({ type: DETAIL_POKEMON, detail_pokemon });
  
  useEffect(() => {
    hitApi(pokemonName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hitApi = async (pokemonName) => {
    const dat_arr = await GetPokemon(pokemonName);
    detailPokemon(dat_arr);
  };
  const ShowData = () => {
    if (!_.isEmpty(detail_pokemon)) {
      return (
        <Link href={`/pokemon/${pokemonName}`} passHref>
          <div className="Card">
            <span className="Card--id">
              #{("00" + detail_pokemon.id).slice(-3)}
            </span>
            <div className="image">
              <Image
                className="Card--image"
                src={
                  detail_pokemon.sprites.other["official-artwork"].front_default
                }
                alt=""
                width={150}
                height={150}
                priority
              />
              <h1 className="Card--name">{pokemonName}</h1>
            </div>
            <div className="Card--details">
              {detail_pokemon.types.map((poke) => poke.type.name).join(", ")}
            </div>
          </div>
        </Link>
      );
    }
  };

  return <>{!_.isEmpty(detail_pokemon) && <ShowData />}</>;
};

export default PokemonList;
