import _ from "lodash";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { IMAGE_POKEMON } from "../../../context/type/Type";
import { MyContext } from "../../../context/store/Context";
import { GetPokemonImage } from "../../../context/actions/PokemonActions";

const PokemonUrlDetailImage = ({ data }) => {
  const pokemonName = data;
  const { ReducerList } = useContext(MyContext);
  const [state, dispatch] = ReducerList();
  const { image_pokemon } = state;
  const imagePokemon = (image_pokemon) => dispatch({ type: IMAGE_POKEMON, image_pokemon });

  useEffect(() => {
    hitApiDetail(pokemonName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hitApiDetail = async (pokemonName) => {
    const dat_arr = await GetPokemonImage(pokemonName);
    imagePokemon(dat_arr);
  };

  const ShowData = () => {
    if (!_.isEmpty(image_pokemon)) {
      return (
        <div>
          <div>
            <Image
              className=""
              src={
                image_pokemon.sprites.other["official-artwork"].front_default
              }
              alt=""
              width={150}
              height={150}
              priority
            />
          </div>
        </div>
      );
    }
  };

  return <div className="">{!_.isEmpty(image_pokemon) && <ShowData />}</div>;
};

export default PokemonUrlDetailImage;
