import { useState } from "react";
import PokemonForm from "../components/pokemon-form/PokemonForm";
import Pokemon from "../models/pokemon.ts";

const PokemonAdd = () => {
    const [id] = useState( new Date().getTime() );
    const [pokemon] = useState( new Pokemon(id) );

    return (
        <div className="row">
            <h2 className="header center">Ajouter un pokemon</h2>
            <PokemonForm pokemon={ pokemon } isEditForm={false}/>
        </div>
    )
}

export default PokemonAdd;