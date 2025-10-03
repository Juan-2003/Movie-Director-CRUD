//-----------------------------------   Director Types   -----------------------------------------------------
export interface Director{
    id : number;
    name : string;
    nationality : string;
    age : number;
    active : boolean;
}

export interface PostDirector{
    name : string;
    nationality : string;
    age : number;
}

export interface UpdateDirector{
    id : number,
    name : string;
    nationality : string;
    age : number;

}

//-----------------------------------    Movie types   -----------------------------------------------------
export interface Movie{
    id : number,
    name : string,
    release_year : string,
    genre : string,
    duration : string,
    fk_director : number,
}

export interface PostMovie{
    name : string,
    release_year :string,
    genre: string,
    duration :string,
    fk_director : number
}

export interface UpdateMovie{
    id : number,
    name : string,
    release_year :string,
    genre: string,
    duration :string,
}