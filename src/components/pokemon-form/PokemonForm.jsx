import formatType from "../../helpers/format-type.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pokemon-form.css";
import PokemonService from "../../services/pokemon-service.ts";

const PokemonForm = ( {pokemon, isEditForm} ) => {

    /*// Type Field
    const error = String;
    const isValid = Boolean;

    // Type Form
    let name = String;
    let hp = String;
    let cp = String;
    let type = String;*/

    const [form, setForm] = useState({ 
          picture: { value: pokemon.picture },
          name: { value: pokemon.name, isValid:true },
          hp: {value: pokemon.hp, isValid:true }, 
          cp: {value: pokemon.cp, isValid:true }, 
          types: {value: pokemon.types, isValid:true }
        });
    
    const navigate = useNavigate();

    const types = [
        "Plante", "Feu", "Eau", "Insecte", "Normal", "Electrik", "Poisson", "Fee", "Vol", "Combat", "Psy"
    ]

    /**
     * @param {String} type 
     * @returns Boolean
     */
    const hasType = (type) => {
        return form.types.value.includes(type);
    }

    /**
     * 
     * @param {HTMLInputElement} e 
     */
    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const newField = { [fieldName]: {value: fieldValue}};
        
        setForm({...form, ...newField});
    }

    /**
     * 
     * @param {String} type 
     * @param {HTMLInputElement} e 
     */
    const selectType = (type, e) => {
        const checked = e.target.checked;
        let newField = Object;

        if (checked) {
            //Si l'utilisateur coche un type, a la liste des types du pokemon.
            const newTypes = form.types.value.concat([type]);
            newField = {value: newTypes }

        } else {
            // Si l'utilisateur decoche un type, on le retire de la liste des types du pokemon.
            const newTypes = form.types.value.filter(currentType => currentType !== type);
            newField = {value: newTypes}  
        }

        setForm({...form, ...{types: newField} });
    }

    /**
     * 
     * @param {HTMLElement} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(form);
        const isFormValid = validForm();

        if (isFormValid) {
            pokemon.picturec = form.picture.value;
            pokemon.name = form.name.value;
            pokemon.hp = form.name.value;
            pokemon.cp = form.name.value;
            pokemon.types = form.name.value;
            
            isEditForm ? updatePokemon() : addPokemon();
        }
    }

    const addPokemon = () => {
        PokemonService.addPokemon(pokemon)
        .then( () => navigate("/pokemons"))
    }

    const updatePokemon = () => {
        PokemonService.updatePokemon(pokemon)
        .then( () => navigate(`/pokemons/${pokemon.id}`) );
    }

    const isAddForm = () => {
        return !isEditForm;
    }


    //VALIDATION DES CHAMPS INPUT DANS LA FORMULAIRE
    const validForm = () => {
        let newForm = form;

        //Validator URL
        if ( isAddForm() ) {
            //const start = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/`;
            const start = `assets/`;
            const end = ".png";

            if( !form.pucture.value.startWidth(start) || !form.picture.value.endWidth(end) ) {
                const errorMsg = "L'url n'est pas valide.";
                const newField = { value: form.picture.value, error: errorMsg, isValid: false }
                newForm = { ...form, ...{ picture: newField } }
            }else {
                 const newField = { value: form.picture.value, error: "", isValid: true }
                 newForm = { ...form, ...{ picture: newField } }
            }
        }

        //Validator name
        if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value) ) {
            const errorMsg = "Le nom du pockemon est requis (1-25).";
            const newField = {value: form.name.value, error: errorMsg, isValid: false};
            newForm = {...form, ...{name: newField} };
        } else {
            const newField = { value: form.name.value, error: "", isValid: true };
            newForm = {...form, ...{ name: newField } };
        }

        //Validator hp
        if(!/^[0-9]{1,3}$/.test(form.hp.value) ){
            const erroMsg = "Les points de vie du pokemon sont compris entre 0 et 999,";
            const newField = { value: form.hp.value, error: erroMsg, isValid: false };
            newForm = {...newForm, ...{hp: newField } };
        }else {
            const newField = { value: form.hp.value, error: "", isValid: true };
            newForm = {...newForm, ...{hp: newField } };
        }

        //Validator cp
        if (!/^[0-9]{1,2}$/.test(form.cp.value) ) {
            const errorMsg = "Les degats du pokemon sont compris entre 0 et 99.";
            const newField = { value: form.cp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{cp: newField}};
        } else {
            const newField = {value: form.cp.value, error: "", isValid: true};
            newForm = { ...newForm, ...{cp: newField} };
        } 

        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    }

    // VALIDATION DE CHAMPS CHECKBOX 
    /**
     * 
     * @param {String} type 
     * @returns Boolean
     */
    const isTypesValid = (type) => {
        if ( form.types.value.length === 1 && hasType(type) ) {
            return false;  
        }

        if ( form.types.value.length >= 3 && !hasType(type) ) {
            return false;  
        }

        return true;
    }


    const deletePokemon = () => {
        PokemonService.deletePokemon(pokemon)
        .then( () => navigate("./pokemons") );
    }


    return (
        <form onSubmit={e => handleSubmit(e)} >
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        {isEditForm && (
                        <div className="card-image">
                            <img src={ pokemon.picture } alt={ pokemon.name } style={ { width: "250px" } } />
                            <span className="btn-floating halfway-fab waves-effect waves-light">
                                <i onClick={deletePokemon} className="matial-icons">Delete</i>
                            </span>
                        </div>
                        )}
                        <div className="card-stacked">
                            <div className="card-content">
                                  {/*  Pokemon picture */}
                                  {isAddForm() && 
                                    <div className="form-group">
                                         <label htmlFor="name">Image</label>
                                         <input id="name" name="picture" type="text" 
                                          className="form-control" value={form.picture.value} 
                                          onChange={e => handleInputChange(e) }/>
                                         {form.picture.error && 
                                         <div className="card-panel red accect-1">
                                             {form.picture.error}
                                         </div>
                                         }
                                    </div>
                                    }

                               {/*  Pokemon name */}
                               <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e) }/>
                                    {form.name.error && 
                                    <div className="card-panel red accect-1">
                                        {form.name.error}
                                    </div>
                                    }
                               </div>

                               {/*  Pokemon hp */}
                               <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input id="hp" name="hp" type="number" className="form-control"value={form.hp.value} onChange={e => handleInputChange(e)}/>
                                    {form.hp.error && 
                                    <div className="card-panel red accect-1">
                                       {form.hp.error}
                                    </div>
                                    }
                               </div> 

                               {/*  Pokemon cp */}
                               <div className="form-group">
                                    <label htmlFor="cp">Degats</label>
                                    <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={ e => handleInputChange(e)}/>
                                    {form.cp.error && 
                                    <div className="card-panel red accect-1">
                                      {form.cp.error}
                                    </div>
                                    }
                               </div>
                               {/*  Pokemon types */}
                               <div className="form-group">
                                    <label>Types</label>
                                    {types.map(type => (
                                        <div key={type} style={ {marginBottom: '10px' } }>
                                            <label>
                                                <input id={type} type="checkbox" style={ {backgroundColor: formatType(type)} }  value={type} disabled={ !isTypesValid(type) } checked={hasType(type)} onChange={(e) => selectType(type, e)} />
                                                <span style={ { backgroundColor: formatType(type) } }> { type } </span>
                                            </label>
                                        </div >
                                    ))}
                               </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn" >Validation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PokemonForm;