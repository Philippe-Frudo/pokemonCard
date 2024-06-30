import { Link } from "react-router-dom"
import IconFind from "../assets/find.png";

const PageNotFound = () => {
    return (
        <div className="center">
            <img src={IconFind} alt="Find" />
            <h1>Hey cette page n'existe pas</h1>
            <Link to="/">
                Retourner a l'accueil
            </Link>
        </div>
    )
}

export default PageNotFound;
