import { ProxyState } from "../Appstate.js"
import Pokemon from "../Models/Pokemon.js"


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
  async getWildPokemon() {
    try {
      let res = await _pokeApi.get("pokemon?limit=151")
      ProxyState.wildPokemon = res.data.results
      console.log(ProxyState.wildPokemon);
    } catch (error) {
      console.error(error)
    }
  }
  async getMyPokemon() {
    let res = await _bcwApi.get("pokemon")
    ProxyState.myPokemon = res.data.data.map(poke => new Pokemon(poke))
  }
  async getActivePokemon(pokeName) {
    let res = await _pokeApi.get("pokemon/" + pokeName)
    ProxyState.activePokemon = new Pokemon(res.data)
    console.log(ProxyState.activePokemon);
  }
  async catchPokemon() {
    let poke = ProxyState.activePokemon
    let res = await _bcwApi.post("pokemon", poke)
    this.getMyPokemon()
  }
  releasePokemon(pokemonId) {
    throw new Error("Method not implemented.");
  }

}


const service = new PokemonService();
export default service;
