import { useState, useEffect } from "react";
import POKEMONS from "./../models/mock-pokemon.ts";
import PokemonCard from "../components/pockemon-card/PockemonCard.jsx";
import "./pokemon-list.css";
import PokemonService from "../services/pokemon-service-Local.ts";
import { Link } from "react-router-dom";
import PokemonSearch from "../components/pokemon-search/pokemonSearch.jsx";


const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect( () => { 
    // setPokemons(POKEMONS) 

    // fetch("http://localhost:3001/pokemons")
    // .then(response => response.json)
    // .then((pokemons) => {
      // setPokemons(pokemons)
    // });

    PokemonService.getPokemon().then(pokemons => setPokemons(pokemons));

  }, []);
  console.log( "Affiche : ",pokemons)

  return (
    <div>
      <h1 className="center"> Pockedex </h1>
      <div className="container">
        <div className="row">

          <PokemonSearch />

          {pokemons.map( (pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} borderColor="red"/>
          ))}
        </div>
        <Link className="btn-floating btn-large waves-effect waves-ligth red z-depth-3" style={ {position: "fixed", bottom: "25px", right: "25px", fontSize: "2rem", color: "#f0f"} } to="/pokemon/add" >

        <i className="material-icons">Add</i>
        </Link>
      </div>
       
    </div>
  );
}

export default PokemonList;
