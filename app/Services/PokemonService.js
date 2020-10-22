

// @ts-ignore
const _pokeApi = axios.create({
  baseURL: "//pokeapi.co/api/v2/",
  timeout: 5000
})

// @ts-ignore
const _bcwApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/mick/",
  timeout: 5000
})

class PokemonService {
  constructor() {

  }

}


const service = new PokemonService();
export default service;
