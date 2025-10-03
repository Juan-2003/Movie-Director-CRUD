namespace crud.Dtos.director
{
     // DTO para recibir datos de creación de director desde el frontend
    public record DirectorDataDto
    (
        string Name,
        string Nationality,
        int? Age
    );
}