import _store from "../store.js";
import Pokemon from "../Models/Pokemon.js"

let _pageOffset = 0;

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
    this.getWildPokemon()
    this.getMyPokemon()
  }
  getWildPokemon() {
    _pokeApi.get(`pokemon?limit=151&offset=${_pageOffset}`).then(res => {
      _store.commit("wildPokemon", res.data.results.map(pokemon => pokemon.name))
    }).catch(err => console.error(err))
  }

  changePage(direction) {
    if (direction == 'back' && _pageOffset != 0) {
      _pageOffset -= 100
    } else if (direction == 'forward' && _pageOffset < 864) {
      _pageOffset += 100
    } else (console.log("end of pages"))
    this.getWildPokemon()
    console.log(_pageOffset);
  }
  getActivePokemon(pokeName) {
    _pokeApi.get("pokemon/" + pokeName).then(res => {
      console.log(res.data);
      _store.commit('activePokemon', new Pokemon(res.data))
    }).catch(err => console.error(err))
  }

  catchPokemon() {
    _bcwApi.post("pokemon", _store.State.activePokemon).then(res => {
      console.log(res);
      this.getMyPokemon()
    }).catch(err => console.error(err))
  }

  getMyPokemon() {
    _bcwApi.get("pokemon").then(res => {
      _store.commit("myPokemon", res.data.data.map(pokemon => new Pokemon(pokemon)))
      console.log(_store.State.myPokemon)
    }).catch(err => console.error(err))
  }
  releasePokemon(pokemonId) {
    _bcwApi.delete("pokemon/" + pokemonId).then(res => {
      _store.commit("myPokemon", _store.State.myPokemon.filter(pokemon => pokemon._id !== pokemonId))
    }).catch(err => console.error(err))
  }
}


const service = new PokemonService();
export default service;
