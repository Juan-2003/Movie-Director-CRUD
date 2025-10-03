import type { Movie, PostMovie, UpdateMovie } from "../types";
import { API_URL } from "./api";

//Controlador
const controller = "/Movie"

//Consultas HTTP para API para Director

//Obtener lista de peliculas
export const getMovies = async (): Promise<Movie[]> => {
    const response = await fetch(API_URL + controller, {
        method: "GET",
    });
    if(!response.ok){
        console.log("Error");
    }
    
    return response.json();    
}

//Crear nueva pelicula
export const createMovie = async(newMovie : PostMovie) : Promise<Movie> => {
    console.log(newMovie);
    const response = await fetch(API_URL + controller, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie)
    });
    
    if(!response.ok){
        console.log("Error");
    }

    return response.json();
}

//Actualizar pelicula existente
export const updateMovie = async (updatedDirector : UpdateMovie) : Promise<Movie> => {
    const response = await fetch(API_URL + controller,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDirector),
    }) 

    if(!response.ok){
        console.log("Error");
    }
    
    const data = await response.json();
    return data;
}

//Eliminar pelicula
export const deleteMovie = async (id:number): Promise<void> => {
    const response = await fetch(API_URL + controller + `/delete/${id}`, {
        method: "DELETE",
    });
    if(!response.ok){
        console.log("Error");
    }
}