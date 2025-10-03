namespace crud.Dtos.movies
{
    // DTO para recibir datos de creación de pelicula desde el frontend
    public record MovieDataDto
    (
        string Name,
        string ReleaseYear,
        string Genre,
        string Duration,
        int FkDirector
    );
}