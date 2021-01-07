import { ProxyState } from "../Appstate.js";
import Pokemon from '../Models/Pokemon.js';
import PokemonService from "../Services/PokemonService.js";


function _drawWildPokemon() {
  let template = ''
  ProxyState.wildPokemon.forEach(poke => template += Pokemon.WildPokemonTemplate(poke.name))
  let wildPokemon = document.getElementById('wild-pokemon')
  wildPokemon.innerHTML = template
}

function _drawActivePokemon() {
  let activePokemon = document.getElementById("active-pokemon")
  activePokemon.innerHTML = ProxyState.activePokemon.ActivePokemonTemplate
}

function _drawMyPokemon() {
  let template = ''
  ProxyState.myPokemon.forEach(poke => template += poke.MyPokemonTemplate)
  let myPokeDex = document.getElementById('my-pokedex')
  myPokeDex.innerHTML = template
}




//Public
export default class PokemonController {
  constructor() {
    ProxyState.on("wildPokemon", _drawWildPokemon)
    ProxyState.on("activePokemon", _drawActivePokemon)
    ProxyState.on("myPokemon", _drawMyPokemon)

  }

  getActivePokemon(pokeName) {
    PokemonService.getActivePokemon(pokeName)
  }
  catchPokemon() {
    PokemonService.catchPokemon()
  }
  releasePokemon(pokemonId) {
    PokemonService.releasePokemon(pokemonId)
  }



}
