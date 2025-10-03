using crud.Models;
using crud.Models.Enums;
using crud.Dtos.director;

//DTO para respuestas de director en la API
//Define los datos que se devuelven cuando se consulta una pelicula
namespace crud.Dtos.movies
{
    public record MovieResponseDto
    (
        int Id,
        string Name,
        DateOnly? ReleaseYear,
        MovieGenre Genre,
        TimeSpan? Duration,
        DirectorResponseDto director
    )
    {
        public MovieResponseDto(Movie movie)
             : this(
                movie.Id,
                movie.Name,
                movie.ReleaseYear,
                movie.Genre,
                movie.Duration,
                new DirectorResponseDto(movie.FkDirectorNavigation))
        {

        }
    }
}