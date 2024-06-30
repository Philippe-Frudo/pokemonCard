export default class Pokemon {
    // 1.Typage des proprietes d'un pokemon
    id: number;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: Array<String>;
    created: Date;

    // 2. Definition des valeurs par defaut des proprietes d'un pokemon
    constructor(
        id: number,
        hp: number = 100,
        cp: number = 10,
        name: string = "...",
        picture: string =  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png",
        types: Array<String> = ["Normal"],
        created: Date = new Date()
    ){
    // 3. Initialisation des proprietes d'un pokemons
    this.id = id;
    this.hp = hp;
    this.cp = cp;
    this.name = name;
    this.picture = picture;
    this.types = types;
    this.created = created;
    }
}