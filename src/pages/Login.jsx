import { useState } from "react";
import AuthentificationService from "../services/authentification-service.ts";
import { Navigate } from "react-router-dom";


const Login = () => {
    const navigate = Navigate();

    const [form, setForm] = useState( 
        {
            userName: { value: "" },
            passowrd: { value: "" }
        } 
    );

    const [message, setMessage] = useState( "Vous etes deconnecte. {pikachu / pikachu}" );

    /**
     * 
     * @param {HTMLInputElement} e 
     */
    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        const newField = { [fieldName]: { value: fieldValue } };

        setForm( { ...form, ...newField } );
    }

    const validateForm = () => {
        let newForm = form;

        //Validator Username
        if (form.userName.value.length < 3) {
            const errorMsg = "Votre prenom doit faire au moins 3 caractere de long";
            const newField = { value: form.userName.value, error: errorMsg, isValid: false };
            newForm = { ...form, ...{ userName: newField } }
        }else {
            const newField = { value: form.userName.value, error: "", isValid: true }
            newForm = { ...form, ...{ userName: newField } }
        }

        //Validator Passowrd
        if (form.passowrd.value.length < 6) {
            const errorMsg = "Votre mot de passe doit faire au moins 6 caractere de long.";
            const newField = { value: form.passowrd.value, error: errorMsg, isValid: false };
            newForm = { ...form, ...{ passowrd: newField } }
        } else {
            const newField = { value: form.passowrd.value, error: "", isValid: true };
            newForm = { ...form, ...{ passowrd: newField } };
        }

        setForm(newForm);

        return form.userName.isValid && form.passowrd.isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            setMessage(" Tentative de connexion en cours ..." );
            AuthentificationService.login(form.userName.value, form.passowrd.value)
            .then( isAuthenticated => {
                if (!isAuthenticated) {
                    setMessage( "Identifiant ou mot de passe incorrect." );
                    return;
                }

                navigate("/pokemons");
            });
        }   
    }

    return (
        <form onSubmit={e => handleSubmit(e)} >
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        <div className="card-staked">
                            <div className="card-content">
                                {/* Form message */}
                                { message && 
                                    <div className="form-group">
                                        {message}
                                    </div>
                                }

                                {/* Field username */}
                                <div className="form-group">
                                    <label htmlFor="username">Identifiant</label>
                                    <input id="username" type="text" className="form-control" value={form.userName.value} onChange={e => handleInputChange(e) } />

                                    {/* Error */}
                                    {form.userName.error && 
                                        <div className="card-panel red accent-1">
                                            {form.userName.error}
                                        </div>
                                    }
                                </div>

                                {/* Field passowrd */}
                                <div className="form-grouup">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input id="password" type="password"  name="password" className="form-control" value={form.passowrd.value} onChange={e => handleInputChange(e) }/>

                                    {/* Error  */}
                                    {form.passowrd.errorMsg && 
                                        <div className="card-panel red accent-1">
                                            {form.passowrd.error}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )

}

export default Login;