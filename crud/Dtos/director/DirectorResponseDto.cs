using crud.Models;
using crud.Models.Enums;

namespace crud.Dtos.director
{
    //DTO para respuestas de director en la API
    //Define los datos que se devuelven cuando se consulta un director
    public record DirectorResponseDto
    (
        int Id,
        string Name,
        Nationality? Nationality,
        int? Age,
        bool Active

    )
    {
        public DirectorResponseDto(Director director)
             : this(director.Id, director.Name, director.Nationality, director.Age, director.Active)
        {

        }
    }
}