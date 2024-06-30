import { useState } from "react";
import "./pockemon-card.css";
import formatDate from "../../helpers/formatDate.ts";
import formatType from "../../helpers/format-type.ts";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({pokemon, borderColor = "#009688"}) => {

    const [color, setColor] = useState();
    let navigate = useNavigate();
    console.log(pokemon)

    const showBorder = () => {
        setColor(borderColor);
    }
    const hiddenBorder = () => {
        setColor("#f5f5f5f5"); //On remet la bordure en gris
    }

    const goToPockemon = (id) => { 
        navigate(`/pokemons/${id}`, { replace: true }) 
    };

    return (
        <div className="col s6 m4" key={pokemon.id} onClick={ () => { goToPockemon(pokemon.id)} } onMouseEnter={showBorder} onMouseLeave={hiddenBorder}>
            <div className="card horizontal" style={ {borderColor: color} }>
                <div className="card-image">
                  {/* <img src={ pokemon.picture } alt={ pokemon.name } /> */}
                </div>
                <div className="card-stacked">
                  <div className="card-content"> 
                    <p>{ pokemon.name }</p>

                    <p><small>{ formatDate(pokemon.created) }</small></p>

                     {pokemon.types.map((type) => ( 
                         <p key={type} style={ {backgroundColor:formatType(type) } }> {type} </p> 
                     ))} 
                  </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonCard;
