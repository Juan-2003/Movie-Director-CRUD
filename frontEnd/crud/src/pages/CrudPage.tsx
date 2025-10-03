import styles from "../styles/CrudPage.module.css"
import { useEffect, useState } from "react";

import DataTable from "../components/Tables/DataTable";
import type { Director, Movie, PostDirector, PostMovie, UpdateDirector, UpdateMovie } from "../types";
import { createDirector, deleteDirector, getDirectors, updateDirector } from "../service/directorService";
import { createMovie, deleteMovie, getMovies, updateMovie } from "../service/movieService";

//Pagina principal del CRUD donde se muestran las dos tablas: Director y Movie
function CrudPage(){
    const [directors, setDirectors] = useState<Director[]>([]); //Estado para almacenar lista de Directors
      const [movies, setMovies] = useState<Movie[]>([]);//Estado para almacenar lista de Movies
    
      //Carga de datos al inicar la pagina
      useEffect(() => {
        const fetchDirectors = async () => {//Cargar lista de Directors
            try {
                const data = await getDirectors();
                setDirectors(data);
            } catch (error) {
                console.error("Error al obtener directores:", error);
            }
            console.log("Directores: "+directors);
        };
        const fetchMovies = async () =>{//Cargar lista de Movies
          try {
              const data = await getMovies();
              setMovies(data);
            } catch (error) {
                console.error("Error al obtener directores:", error);
            }
        }
        fetchDirectors();
        fetchMovies();
      }, []);
      
      //Manejar creacion de Director en formulario
      const handleCreateSubmitDirector = async (data: PostDirector) => {
        await createDirector(data);
        const updatedDirectors = await getDirectors();
        
        setDirectors(updatedDirectors);
      }
      
      //Manejar creacion de Movie en formulario
      const handleCreateSubmitMovie = async (data: PostMovie) => {
        await createMovie(data);
        const updatedMovies = await getMovies();
        setMovies(updatedMovies);
      }
      
      //Manejar actualizacion de Director en formulario
      const handleUpdateSubmitDirector = async (id:number, data:Omit<UpdateDirector,"id">) => {
        await updateDirector({id, ...data});
      }
      
      //Manejar actualizacion de Movie en formulario
      const handleUpdateSubmitMovie = async (id:number, data:Omit<UpdateMovie,"id">) => {
        await updateMovie({id, ...data});
      }
      
      //Manejar eliminacion de Director
      const handleDeleteDirector = async (id : number) => {
        await deleteDirector(id);
        setDirectors((prev) => prev.filter((directors) => directors.id != id));
      }
      
      //Manejar eliminacion de Movie
      const handleDeleteMovie = async (id : number) => {
        await deleteMovie(id);
        setMovies((prev) => prev.filter((movies) => movies.id != id));
      }
    
      return (
        <>
          <div className={styles.container}>
              {/*Tabla de Director*/}
              <DataTable 
                title='Directors' 
                data={directors} 
                onUpdate={handleUpdateSubmitDirector} 
                onCreate={handleCreateSubmitDirector}
                onDelete={handleDeleteDirector}
              />

              {/*Tabla de Movie*/}
              <DataTable 
                title='Movies'
                data={movies} 
                onUpdate={handleUpdateSubmitMovie} 
                onCreate={handleCreateSubmitMovie}  
                onDelete={handleDeleteMovie}
              />
          </div>
        </>
      )
}

export default CrudPage;