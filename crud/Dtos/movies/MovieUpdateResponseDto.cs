using crud.Models;
using crud.Models.Enums;
using crud.Dtos.director;

 //DTO que define los datos que se devuelven cuando se actualiza una pelicula
namespace crud.Dtos.movies
{
    public record MovieUpdateResponseDto
    (
        int Id,
        string Name,
        DateOnly? ReleaseYear,
        MovieGenre Genre,
        TimeSpan? Duration,
        DirectorResponseDto director
    )
    {
        public MovieUpdateResponseDto(Movie movie)
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