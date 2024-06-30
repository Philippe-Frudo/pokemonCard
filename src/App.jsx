import PokemonList from "./pages/PokemonList";
import PockemonDetail from "./pages/PokemonDetail";
import PageNotFound from "./pages/PageNotFound";
import PokemonEdit from "./pages/PokemonEdit";
import { Route, Link, Routes, BrowserRouter, Navigate } from "react-router-dom";
import PokemonAdd from "./pages/pokemonAdd";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    
    <div>
        <BrowserRouter>
          {/* La barre de navigation commun a toutes les pages */}
          <nav className="nav-wrapper teal">
            <Link to="/" className="brand-log center">Pokedex</Link>
          </nav> 
          {/* La systeme de gestion des routes de notre application */}
            <Routes>
              <Route exact path="/" element={ <PokemonList/> }/>
              <Route exact path="/login" element={ <Login/> } />
              <Route exact path="/pokemons" element={ <PokemonList/> }/>
              <Route exact path="pokemon/add" element={ <PokemonAdd/> }/>
              <Route exact path="/pokemons/edit/:id" element={ <Route/> }/>
              <Route path="/pokemons/:id" element={ <PockemonDetail/> }/>
              
              <Route path="/404" element={ <PageNotFound/> }/>
              <Route path="*" element={ <Navigate replace to="/404"/> }/>
            </Routes>       
      </BrowserRouter>
        </div>
    
  );
}

export default App;
