
export default class PokemonService {

    /**
     * 
     * @returns Object <Promise<Pokemon[]> >
     */
    static getPokemon() {
        return fetch("http://localhost:3001/pokemons")
        .then(response => response.json() )
        .catch(error => this.handleError(error) );
    }


    /**
     * 
     * @param id number
     * @returns Object <Promise<Pokemon[] | null> >
     */
    static getPokemonById(id: number) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
        .then(response => response.json() )
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error) );
    }


    /**
     * 
     * @param pokemon Object
     * @returns Promise<Pokemon>
     */
    static updatePokemon(pokemon) {
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


    /**
     * 
     * @param pokemon Object
     * @returns Object // retourn d'Object NULL
     */
    static deletePokemon(pokemon) {
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

    
    /**
     * 
     * @param pokemon Object // objet depuis la formulaire pokemon
     * @returns Object
     */
    static addPokemon(pokemon) {
        delete pokemon.created;

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