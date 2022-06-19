import _ from "lodash";
import React, { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { MyContext } from "../../../context/store/Context";
import { GetPokemonList } from "../../../context/actions/PokemonActions";
import { LIST_POKEMON } from "../../../context/type/Type";
import PokemonListDetail from "./PokemonListDetail";

const PokemonList = () => {
  const { ReducerList } = useContext(MyContext);

  const [state, dispatch] = ReducerList();
  const { list_pokemons } = state;
  const listPokemons = (list_pokemons) =>
    dispatch({ type: LIST_POKEMON, list_pokemons });

  const [search, setSearch] = useState();
    
  useEffect(() => {
    hitList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hitList = async (page = 1) => {
    const data = await GetPokemonList(page);
    listPokemons(data);
  };
  const showData = () => {
    if (!_.isEmpty(list_pokemons)) {
      return (
        <div className="grid md:grid-cols-5 grid-cols-2 gap-5">
          {list_pokemons.results.map((el) => {
            return <PokemonListDetailShow data={el.name} key={el.name} />;
          })}
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto md:px-12 px-6">
      <div className="hidden md:block">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <Link href={`/pokemon/${search}`}>search</Link>
          </button>
        </div>
      </div>
      <div className="md:hidden ">
        <div className="search_mobile">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <Link href={`/pokemon/${search}`}>search</Link>
          </button>
        </div>
      </div>

      {showData()}
      <div className="container mx-auto px-6">
        {!_.isEmpty(list_pokemons) && (
          <ReactPaginate
            previousLabel={<ChevronLeftIcon className="h-5 w-5" />}
            nextLabel={<ChevronRightIcon className="h-5 w-5" />}
            pageCount={Math.ceil(list_pokemons.count / 20)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={0}
            onPageChange={(data) => hitList(data.selected + 1)}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonList;
export const PokemonListDetailShow = React.memo(PokemonListDetail);
