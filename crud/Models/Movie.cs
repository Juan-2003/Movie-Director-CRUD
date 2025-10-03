using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using crud.Dtos.movies;
using crud.Models.Enums;

namespace crud.Models;

//Entidad Movie
//Mapea la tabla "movies" de la BD
public partial class Movie
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly? ReleaseYear { get; set; }

    public MovieGenre Genre { get; set; }

    public TimeSpan? Duration { get; set; }

    public int FkDirector { get; set; }

    public virtual Director FkDirectorNavigation { get; set; } = null!;

    public Movie() { }

    //Constructor: Crea un Movie a partir de los datos recibidos
    public Movie(MovieDataDto movieDataDto)
    {
        this.Name = movieDataDto.Name;
        this.ReleaseYear = DateOnly.Parse(movieDataDto.ReleaseYear);
        this.Genre = Enum.Parse<MovieGenre>(movieDataDto.Genre);
        this.Duration = TimeSpan.Parse(movieDataDto.Duration);
        this.FkDirector = movieDataDto.FkDirector;
    }

     //Actulizar atributos
    public void updateMovie(MovieUpdateDataDto movieUpdateDataDto)
    {
        string name = movieUpdateDataDto.Name;
        DateOnly releaseYear = DateOnly.Parse(movieUpdateDataDto.ReleaseYear);
        MovieGenre genre = Enum.Parse<MovieGenre>(movieUpdateDataDto.Genre);
        TimeSpan duration = TimeSpan.Parse(movieUpdateDataDto.Duration);

        if (this.Name != name) this.Name = name;
        if (this.ReleaseYear != null && this.ReleaseYear != releaseYear) this.ReleaseYear = releaseYear;
        if (this.Genre != genre) this.Genre = genre;
        if (this.Duration != null && this.Duration != duration) this.Genre = genre;
    }
}
