import Pokemon from "./pokemon";
import IMG_2 from "../assets/img (2).jpg";
import IMG_3 from "../assets/img (3).jpg";
import IMG_4 from "../assets/img (4).jpg";
import IMG_5 from "../assets/img (5).jpg";
import IMG_6 from "../assets/img (6).jpg";
import IMG_7 from "../assets/img (7).jpg";
import IMG_8 from "../assets/img (8).jpg";

export const POKEMONS: Pokemon[] = [
    {
        id: 1,
        name: "Bulbizarre",
        hp: 25,
        cp: 5,
        picture: IMG_2,
        types: ["Plante", "Poisson"],
        created: new Date()
    },
    {
        id: 2,
        name: "Salameche",
        hp: 28,
        cp: 6,
        picture: IMG_3,
        types: ["Feu"],
        created: new Date()
    },
    {
        id: 3,
        name: "Salameche",
        hp: 21,
        cp: 6,
        picture: IMG_4,
        types: ["Eau"],
        created: new Date()
    },
    {
        id: 4,
        name: "Salameche",
        hp: 28,
        cp: 4,
        picture: IMG_5,
        types: ["Electrik"],
        created: new Date()
    },
    {
        id: 5,
        name: "Groupe I",
        hp: 19,
        cp: 6,
        picture: IMG_6,
        types: ["Insect"],
        created: new Date()
    },
    {
        id: 6,
        name: "Melofee",
        hp: 23,
        cp: 4,
        picture: IMG_7,
        types: ["Vol"],
        created: new Date()
    },
    {
        id: 7,
        name: "Sabelette",
        hp: 27,
        cp: 8,
        picture: IMG_8,
        types: ["Combat"],
        created: new Date()
    }
     
];

export default POKEMONS;
