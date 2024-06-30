import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import POKEMONS from "../models/mock-pokemon.ts";
import formatDate from "../helpers/formatDate.ts";
import formatType from "../helpers/format-type.ts";
import PokemonService from "../services/pokemon-service.ts";
import Loader from "../components/loader/Loader.jsx";


const PockemonDetail = () => {
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
       })*/

        // "+ permet de convertir un nombre une chaine de caractere en entier"
        PokemonService.getPokemonById(+ID).then(pokemon => setPokemon(pokemon) );

    }, [ID]);

    return (
        <div>
            { pokemon ? (
                <div className="row">
                    <div className="col s12 m8 offset-m2">
                        <h2 className="header center">{ pokemon.name }</h2>
                        <div className="card hoveable">
                            <div className="casd-image">
                                <img src={pokemon.picture} alt={pokemon.name} style={ {width: "250px"}}/>
                                <Link to={`/pokemons/edit/${pokemon.id}`} className="btn btn-foating halfway-fab waves-effect waves-light">
                                    <i className="material-icons">Edit</i>
                                </Link>
                            </div>
                            <div className="card-stacked">
                                <div className="card-content">
                                    <table className="bordered striped">
                                        <tbody>
                                            <tr>
                                                <td>Nom</td>
                                                <td><strong>{ pokemon.name }</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Points de vie</td>
                                                <td><strong>{ pokemon.hp }</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Degats</td>
                                                <td><strong>{ pokemon.cp }</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Types</td>
                                                <td><strong>{ pokemon.types.map( type => (
                                                    <span key={type}  style={ {backgroundColor: formatType(type)} }> {type} </span>
                                                )) }</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Date de creation</td>
                                                <td><strong>{ formatDate(pokemon.created) }</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-action">
                                    <Link to="/" onClick={ setID() }>Retour</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ):(
                    <Loader/>
                    // <h4 className="center">Aucun pokemon a afficher !</h4>
                )
            }
        </div> 
    );
}

export default PockemonDetail;