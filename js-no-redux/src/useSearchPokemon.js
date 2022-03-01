// import { Pokemon } from "./exampleReactApp";
import {useEffect} from "react";

export function useSearchPokemon(setResult, activeSearchParams){
    useEffect(()=>{

        // This line exits the use effect if our active search params are null or incomplete
        // You can write custom logic in your hooks to perform specific actions as required
        if(!activeSearchParams || !activeSearchParams.searchText || (!activeSearchParams.isShiny && activeSearchParams.isShiny !== false)){
            return;
        }
        const {searchText, isShiny} = activeSearchParams;
        // Pokemon API: 
        // fetch(`https://veekun.com/dex/pokemon/search?type=${activeSearchParams.isShiny}&introduced_in=${activeSearchParams.generation}`).then(res=>{
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchText}`)
        .then(async res => {
            const rawPokemonData = await res.json();

            // NOTE:
            // In this example, both sprites are returned regardless of the isShiny parameter. 
            // I included isShiny in the activeSearchParameters to demonstrate you can have multiple values make up these search parameters
            // (I couldn't find a better API which did a search with both parameters)
            // A better solution to this particular problem would be to only have the searchText in the activeSearchParameters, save both sprites in the Pokemon state, and select which one to display based on isShiny
            // But this is just a demonstration to show you can have multiple things in your active parameters :)
            let sprite = rawPokemonData.sprites.front_default;
            if(isShiny === true){
                sprite = rawPokemonData.sprites.front_shiny;
            }            

            setResult({
                name: rawPokemonData.name,
                sprite,
                id: rawPokemonData.id,
            })
            }
        ).catch(reason => {
          // In real app, should include appropriate error response here
          // Not necessary for this demo tho.
          console.error("There was an error searching for the pokemon!");
          console.error(reason);
        })
      },[activeSearchParams, setResult])
}