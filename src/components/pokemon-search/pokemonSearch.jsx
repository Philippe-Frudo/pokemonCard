import { Link } from "react-router-dom";
import Pokemon from "../../models/pokemon.ts";
import PokemonService from "../../services/pokemon-service.ts";
import { useState } from "react";


const PokemonSearch = () => {
    const [term, setTerm] = useState( "" );
    const [pokemons, setPokemons] = useState( [] );

    /**
     * 
     * @param {HTMLInputElement} e 
     * @returns Object
     */
    const handleInputChange = (e) => {
        const term = e.target.value;
        setTerm(term);

        if (term.length <= 1) {
            setPokemons( [] );
            return;
        }

        PokemonService.searchPokemon(term)
        .then(pokemons => setPokemons(pokemons) );
    }

    return (
        <div className="row">
            <div className="col s12 m6 offset-m3">
                <div className="card">
                    <div className="card-content">
                        <div className="input-field">
                            <input type="text" placeholder="Rechercher un pokemon" value={term}  onChange={ e => handleInputChange(e) }/>
                        </div>
                        <div className="collection">
                            {
                              pokemons.map( (pokemon) => {
                                <Link to={ `/pokemons/${pokemon.id}` } className="collection-item" > 
                                    {pokemon.name}
                                </Link>
                              })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonSearch;