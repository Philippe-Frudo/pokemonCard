/*const formatType1 = (type) => {
        let color: String;
        switch (type) {
            case "Feu":
                color = "red ligthten-1";
                break;
            case "Eau":
                color = "blue ligthten-1";
                break;
            case "Plante":
                color = "green ligthten-1";
                break;
            case "Insecte":
                color = "brown ligthten-1";
                break;
            case "Normal":
                color = "grey ligthten-1";
                break;
            case "Vol":
                color = "pink ligthten-1";
                break;
            case "Poisson":
                color = "deep-purple accent-1";
                break;
            case "Fee":
                color = "pink ligthten-4";
                break;
            case "Psy":
                color = "deep-purple darken-2";
                break;
            case "Electrik":
                color = "lime accent-1";
                break;
            case "Combat":
                color = "deep-orange";
                break;
        
            default:
                color = "grey";
                break;
        }
        return `chip ${color}`; 
    }*/
const formatType = (type: String): String => {
        let color: String;
        switch (type) {
            case "Feu":
                color = "red";
                break;
            case "Eau":
                color = "blue";
                break;
            case "Plante":
                color = "green";
                break;
            case "Insecte":
                color = "brown";
                break;
            case "Normal":
                color = "grey";
                break;
            case "Vol":
                color = "pink";
                break;
            case "Poisson":
                color = "purple";
                break;
            case "Fee":
                color = "pink";
                break;
            case "Psy":
                color = "purple";
                break;
            case "Electrik":
                color = "lime";
                break;
            case "Combat":
                color = "deep-orange";
                break;
        
            default:
                color = "grey";
                break;
        }
        return color; 
}
export default formatType;