import axios from "axios";
export const API_SERVER = process.env.api_pokemon;
export const Axios = axios.create({
  baseURL: API_SERVER,
});

export const GetPokemonList = async (page) => {
  const perPage = 20;
  const offset = page * perPage - perPage;
  const result = await Axios.get(`/pokemon?limit=${perPage}&offset=${offset}`)
    .then((res) => {
      // console.log(res.data);
      return res;
    })
    .catch((err) => {
      // console.log(err.response.data);
      return err;
    });

  if (result.data) {
    return result.data;
  } else {
    return result.response.data;
  }
};

export const GetPokemon = async (pokemon) => {
  const result = await Axios.get(`/pokemon/${pokemon}`)
    .then((res) => {
      // console.log(res.data);
      return res;
    })
    .catch((err) => {
      // console.log(err.response.data);
      return err;
    });

  if (result.data) {
    return result.data;
  } else {
    return result.response.data;
  }
};

export const GetPokemonImage = async (pokemon) => {
  const result = await Axios.get(`/pokemon/${pokemon}`)
    .then((res) => {
      // console.log(res.data);
      return res;
    })
    .catch((err) => {
      // console.log(err.response.data);
      return err;
    });

  if (result.data) {
    return result.data;
  } else {
    return result.response.data;
  }
};

export const GetPokemonSpecies = async (pokemon) => {
  const result = await Axios.get(`/pokemon-species/${pokemon}`)
    .then((res) => {
      // console.log(res.data);
      return res;
    })
    .catch((err) => {
      // console.log(err.response.data);
      return err;
    });

  if (result.data) {
    return result.data;
  } else {
    return result.response.data;
  }
};

export const GetPokemonUrl = async (url_pokemon) => {
  const result = await axios
    .get(`${url_pokemon}`)
    .then((res) => {
      // console.log(res.data);
      return res;
    })
    .catch((err) => {
      // console.log(err.response.data);
      return err;
    });

  if (result.data) {
    return result.data;
  } else {
    return result.response.data;
  }
};
