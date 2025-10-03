using crud.Models;

namespace crud.Dtos.director
{
    //DTO que define los datos que se devuelven cuando se actualiza un director
    public record DirectorUpdateResponseDto
    (
        int Id,
        string Name,
        string? Nationality,
        int? Age,
        bool Active
    )
    {
        public DirectorUpdateResponseDto(Director director)
             : this(director.Id, director.Name, director.Nationality.ToString(), director.Age, director.Active)
        {

        }
    }
}