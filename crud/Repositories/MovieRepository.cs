using crud.Dtos.movies;
using crud.Models;
using Microsoft.EntityFrameworkCore;
namespace crud.Repositories
{
    //Repositorio para operaciones y consultas de Movie en la BD
    public class MovieRepository
    {
        //Contexto de Entity Framework para acceso a la BD
        private readonly CrudContext _context;

        public MovieRepository(CrudContext context)
        {
            this._context = context;//Inyeccion de dependencia
        }

        //Obtener lista de peliculas con directores
        public List<Movie> GetMoviesWithDirectors()
        {
            return _context.Movies
                .Include(m => m.FkDirectorNavigation)
                .ToList();
        }

        //Obtener pelicula con director por ID
        public Movie? GetMovieWithDirector(int id)
        {
            return _context.Movies
                .Include(m => m.FkDirectorNavigation)
                .FirstOrDefault(m => m.Id == id);
        }

         //Obtener pelicula sin director
        public Movie? GetMovie(int id)
        {
            return _context.Movies.FirstOrDefault(m => m.Id == id);
        }

        //Crear nueva pelicula
        public void CreateMovie(Movie movie)
        {
            _context.Movies.Add(movie);
            _context.SaveChanges();
        }

        //Actualizar pelicula existente
        public void UpdateMovie(Movie movie, MovieUpdateDataDto movieUpdateDataDto)
        {
            movie.updateMovie(movieUpdateDataDto);
            _context.SaveChanges();
        }

        //Eliminar pelicula
        public void DeleteMovie(Movie movie)
        {
            _context.Movies.Remove(movie);
            _context.SaveChanges();
        }
    }
}