import Pokemon from "../models/pokemon.ts";
import POKEMONS from "../models/mock-pokemon.ts";


export default class PokemonService {

    static pokemons =  POKEMONS;

    static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === "development");

    
    /**
     * 
     * @returns Object <Promise<Pokemon[]> >
     */
    static getPokemon() {
        if (this.isDev) {
            return fetch("http://localhost:3001/pokemons")
            .then(response => response.json() )
            .catch(error => this.handleError(error) );
        }

        return new Promise(resolve => { resolve(this.pokemons) })
    }


    /**
     * 
     * @param id number
     * @returns Object <Promise<Pokemon[] | null> >
     */
    static getPokemonById(id: number) {
        if (this.isDev) {
            return fetch(`http://localhost:3001/pokemons/${id}`)
            .then(response => response.json() )
            .then(data => this.isEmpty(data) ? null : data)
            .catch(error => this.handleError(error) );
        }

        return new Promise(resolve => { resolve( this.pokemons.find(pokemon => id === pokemon.id)); });
    }


    /**
     * 
     * @param pokemon Object
     * @returns Promise<Pokemon>
     */
    static updatePokemon(pokemon) {
        if (this.isDev) {
            return fetch(
                `http://localhost:3001/${pokemon.id}`, 
                {
                    method: "PUT",
                    body: JSON.stringify(pokemon),
                    headers: { "Content-Type": "application/json" }
                }
            )   
                .then(response => response.json() )
                .catch(error => this.handleError(error) );
        }

        return new Promise(resolve => { 
            const { id } = pokemon;
            const index = this.pokemons.findIndex(pokemon => pokemon.id === id );
            this.pokemons[index] = pokemon;
            resolve(pokemon);
         })

    }


    /**
     * 
     * @param pokemon Object
     * @returns Object // retourn d'Object NULL
     */
    static deletePokemon(pokemon) {
        if (this.isDev) {
            return fetch(
                `http://localhost:3001/pokemons/${pokemon.id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                }
            )
                .then(response => response.json() )
                .catch(error => this.handleError(error) );
        }

        return new Promise(resolve => { 
            const { id } = pokemon;
            this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id );
            resolve({});
        })

    }

    
    /**
     * 
     * @param pokemon Object // objet depuis la formulaire pokemon
     * @returns Object
     */
    static addPokemon(pokemon) {
        pokemon.created = new Date(pokemon.created);

        if (this.isDev) {
            return fetch(
                `http://localhost:3001/pokemons`,
                {
                    method: "POST",
                    body: JSON.stringify(pokemon),
                    headers: { "Content-Type": "application/json" }
                }
            )
            .then(response => response.json() )
            .catch(error => this.handleError(error) );
        }

        return new Promise(resolve => { 
            this.pokemons.push(pokemon);
            resolve(pokemon);
        })
    }


    /**
     * 
     * @param term String
     * @returns Object
     */
    static searchPokemon(term: String) {
        return fetch(`http://localhost:3001/pokemons?q=${term}`)
        .then(response => response.json() )
        .catch(error => this.handleError(error) );
    }


    /**
     * 
     * @param data Object
     * @returns Boolean
     */
    static isEmpty(data: Object) {
        return Object.keys(data).length === 0;
    }


    /**
     * 
     * @param error Error
     */
    static handleError(error: Error) {
        console.error(error);
    }

}