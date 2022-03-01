import React, {useCallback, useState} from 'react';
import { useSearchPokemon } from './useSearchPokemon';
import './App.css';

// type PokemonType = 'FIRE' | 'WATER' | 'GRASS';

// export interface Pokemon {
//     name: string;
//     type_1: PokemonType
//     type_2?: PokemonType
//     generation: number;
//     image_url: string;
// }

function App() {
  const [activeSearchParams, setActiveSearchParams] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isShiny, setIsShiny] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  
  useSearchPokemon(setPokemon, activeSearchParams);
  
      // A function that sets the active search params to the current isShiny and searchText when called
      const searchForPokemon = useCallback(()=>{
          const lowerCaseSearchText = searchText.toLowerCase();
          setActiveSearchParams({
              isShiny,
              searchText: lowerCaseSearchText
          })
      },[setActiveSearchParams, isShiny, searchText]);
  
  return (
    <div className="App">
    <h1>Search for Pokemon!</h1>
    <div>
      <label htmlFor="searchTextInput">Pokemon name or Pokedex Number:   </label>
    <input id="searchTextInput" value={searchText} onChange={(event)=>{
      setSearchText(event.target.value);
      event.preventDefault();
    }}></input></div>
    <div>
    <label htmlFor="isShinyInput">Normal or shiny?</label>
    <select value={isShiny ? "S" : "N"} onChange={(event)=>{
      const isShiny = event.target.value === "S";
      setIsShiny(isShiny);
      console.log("Setting is shiny: ")
      console.log(event.target.value);
      event.preventDefault();
    }}>
      <option value="N">Normal</option>
      <option value="S">Shiny</option>
    </select>
    </div>
    <button onClick={event => {searchForPokemon();
    event.preventDefault();}}>Search</button>
      {pokemon &&<div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <b style={{fontSize: "1.4rem"}}>#{pokemon.id} - {pokemon.name}</b>
            <img src={pokemon.sprite}></img>
      </div>}
    </div>)
}

export default App;
