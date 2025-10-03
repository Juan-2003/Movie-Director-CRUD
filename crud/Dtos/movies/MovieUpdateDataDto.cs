namespace crud.Dtos.movies
{
    //DTO que define los campos a actualizar
    public record MovieUpdateDataDto
    (
        int Id,
        string Name,
        string ReleaseYear,
        string Genre,
        string Duration
    );
}