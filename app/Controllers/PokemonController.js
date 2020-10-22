import PokemonService from "../Services/PokemonService.js";
import Pokemon from "../Models/Pokemon.js"
import _store from "../store.js";

//Private
let _pagenumber = 1;


function _drawWildPokemon() {
  let template = ''
  _store.State.wildPokemon.forEach(pokemonName => template += Pokemon.WildPokemonTemplate(pokemonName))
  document.getElementById('wild-pokemon').innerHTML = template
}

function _drawActivePokemon() {
  // @ts-ignore
  document.getElementById("active-pokemon").innerHTML = _store.State.activePokemon.ActivePokemonTemplate
}

function _drawMyPokemon() {
  let template = ''
  _store.State.myPokemon.forEach(pokemonName => template += pokemonName.MyPokemonTemplate)
  document.getElementById('my-pokedex').innerHTML = template
}

function _drawPageNumber(direction) {
  direction == "forward" ? _pagenumber++ : direction == "back" ? _pagenumber-- : console.log("out of pages");
  document.getElementById('page-counter').innerText = `${_pagenumber}/10`
}


//Public
export default class PokemonController {
  constructor() {
    _store.subscribe("wildPokemon", _drawWildPokemon);
    _store.subscribe("activePokemon", _drawActivePokemon);
    _store.subscribe("myPokemon", _drawMyPokemon);
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

  changePage(direction) {
    PokemonService.changePage(direction)
    _drawPageNumber(direction)
  }

}
