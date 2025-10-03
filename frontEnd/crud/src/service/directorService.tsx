import type { Director, PostDirector, UpdateDirector } from "../types";
import { API_URL } from "./api";

//Controlador
const controller = "/Director";

//Consultas HTTP para API para Director

//Obtener lista de directores
export const getDirectors = async (): Promise<Director[]> => {
    const response = await fetch(API_URL + controller, {
        method: "GET",
    });
    
    if(!response.ok){
        console.log("Error");
    }
    
    return response.json();
}

//Crear nuevo director
export const createDirector = async(newDirector : PostDirector) : Promise<Director> => {
    const response = await fetch(API_URL + controller,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newDirector),
    }) 
    
    if(!response.ok){
        console.log("Error");
    }

    return response.json();
} 

//Actualizar director existente
export const updateDirector = async (updatedDirector : UpdateDirector) : Promise<Director> => {
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

//Eliminar director
export const deleteDirector = async (id : number): Promise<void> => {
    const response = await fetch(API_URL + controller + `/delete/${id}`,{
        method: "DELETE",
    });

    if(!response.ok){
        console.log("Error");
    }
    console.log(response.json);
}