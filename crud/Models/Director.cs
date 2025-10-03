using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using crud.Dtos.director;
using crud.Models.Enums;

namespace crud.Models;

//Entidad Director
//Mapea la tabla "director" de la BD
public partial class Director
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public Nationality Nationality { get; set; }

    public int? Age { get; set; }

    public bool Active { get; set; }

    public virtual ICollection<Movie> Movies { get; set; } = new List<Movie>();

    public Director() { }

     //Constructor: Crea un Director a partir de los datos recibidos
    public Director(DirectorDataDto directorDataDto)
    {
        this.Name = directorDataDto.Name;
        this.Nationality = Enum.Parse<Nationality>(directorDataDto.Nationality);
        this.Age = directorDataDto.Age;
        this.Active = true;
    }

    //Actulizar atributos
    public void updateDirector(DirectorUpdateDataDto directorUpdateDataDto)
    {
        string name = directorUpdateDataDto.Name;
        Nationality nationality = Enum.Parse<Nationality>(directorUpdateDataDto.Nationality);
        int? age = directorUpdateDataDto.Age;
        bool active = directorUpdateDataDto.Active;

        if (this.Name != name) this.Name = name;
        if (this.Nationality != nationality) this.Nationality = nationality;
        if (age != null && this.Age != age) this.Age = age;
        this.Active = active;
    }

}
