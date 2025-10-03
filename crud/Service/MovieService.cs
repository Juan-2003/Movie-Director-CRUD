using crud.Dtos.director;
using crud.Dtos.movies;
using crud.Models;
using crud.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace crud.Service
{
    public class MovieService
    {
        //Dependencia: Repositorio de Movie
        private readonly MovieRepository _movieRepository;

        //Dependencia: Repositorio de Director
        private readonly DirectorRepository _directorRepository;

        public MovieService(MovieRepository movieRepository, DirectorRepository directorRepository)
        {
            //Inyeccion de dependencias
            this._movieRepository = movieRepository;
            this._directorRepository = directorRepository;
        }

        //Obtener lista de peliculas
        public List<MovieResponseDto> GetMoviesList()
        {
            List<Movie> movies = _movieRepository.GetMoviesWithDirectors();

            //Cada Movie se mapea a "MovieResponseDto"
            return movies.Select(movie => new MovieResponseDto(movie))
                .ToList();
        }

        //Obtener pelicula por id
        public MovieResponseDto? GetMovie(int id)
        {
            Movie? movie = _movieRepository.GetMovieWithDirector(id);
            if (movie == null) return null;

            return new MovieResponseDto(movie);
        }

        //Crear pelicula
        public MovieResponseDto? CreateMovie(MovieDataDto movieDataDto)
        {
            //Obtiene director por id
            Director? director = _directorRepository.GetDirector(movieDataDto.FkDirector);

            if (director == null)
                return null;

            //Crea pelicula nueva
            Movie newMovie = new Movie(movieDataDto);
            _movieRepository.CreateMovie(newMovie);

            //Se le asigna pelicula al director
            newMovie.FkDirectorNavigation = director;

            return new MovieResponseDto(newMovie);
        }

        //Actualizar pelicula existente
        public MovieUpdateResponseDto? UpdateMovie(MovieUpdateDataDto movieUpdateData)
        {
            Movie? movie = _movieRepository.GetMovieWithDirector(movieUpdateData.Id);
            if (movie == null) return null;

            _movieRepository.UpdateMovie(movie, movieUpdateData);
            return new MovieUpdateResponseDto(movie);
        }

        //Eliminar pelicula
        public bool DeleteMovie(int id)
        {
            Movie? movie = _movieRepository.GetMovie(id);
            if (movie == null) return false;

            _movieRepository.DeleteMovie(movie);
            return true;
        }
    }
}
  