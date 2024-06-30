import { useEffect, useState } from "react";
//import POKEMONS from "../models/mock-pokemon.ts";
import PokemonForm from "../components/pokemon-form/PokemonForm.jsx";
import PokemonService from "../services/pokemon-service.ts";
import Loader from "../components/loader/Loader.jsx";


const PokemonEdit = () => {
    const [pokemon, setPokemon] = useState(null);

    // Recuperation de l'ID dans le LOCATION
    let ID = String;
    let pathName = window.location.pathname;
    const tabID = [];
    for (let i = pathName.length ; i > 0; i--) {
        if (pathName[i] === "/") break;
        tabID.unshift(pathName[i]);  
    }
    ID = tabID.join("");
    
    // Supprimer la valeur de l'ID lorsqu'on retourne
    const setID = () => {  
        ID = null; 
    }

    useEffect( ()=> {
        /*POKEMONS.forEach( pokemon => {
            if ( ID === pokemon.id.toString() ) {
                setPokemon(pokemon);
            }
        })*/

        /*fetch(`http://localhost:3001/pokemons/${ID}`)
            .then(response => response.json )
            .then(pokemon => {
                 if(pokemon.id) setPokemon(pokemon)
            }
        );*/

        // "+ permet de convertir un nombre une chaine de caractere en entier"
        PokemonService.getPokemonById(+ID).then(pokemon => setPokemon(pokemon) );

    }, [ID]);

    return (
        <div>
            { pokemon ? (
                <div className="row">
                    <h2>Editer { pokemon.name }</h2>
                    <PokemonForm pokemon={ pokemon } isEditForm={true}></PokemonForm>
                </div>
                ):(
                    <Loader/>
                    // <h4 className="center">Aucun pokemon a afficher !</h4>
                )
            }
        </div> 
    );
}

export default PokemonEdit;