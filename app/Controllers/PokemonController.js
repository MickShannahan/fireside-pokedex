import PokemonService from "../Services/PokemonService.js";

//Private
let _pagenumber = 1;


function _drawWildPokemon() {
  let template = ''
  let wildPokemon = document.getElementById('wild-pokemon')
}

function _drawActivePokemon() {
  // @ts-ignore
  let activePokemon = document.getElementById("active-pokemon")
}

function _drawMyPokemon() {
  let template = ''
  let myPokeDex = document.getElementById('my-pokedex')
}




//Public
export default class PokemonController {
  constructor() {

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
