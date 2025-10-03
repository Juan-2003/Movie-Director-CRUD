namespace crud.Dtos.director
{
    //DTO que define los campos a actualizar
    public record DirectorUpdateDataDto
    (
        int Id,
        string Name,
        string Nationality,
        int? Age,
        bool Active
    );
}