using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using crud.Dtos.director;
using crud.Dtos.movies;
using crud.Models;
using crud.Service;
using Microsoft.AspNetCore.Mvc;

//Controlador para gestionar operaciones CRUD de movies.
namespace crud.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        //Dependencia: Service de Movie
        private readonly MovieService _movieService;

        public MovieController(MovieService movieService)
        {
            this._movieService = movieService;// Inyección de dependencia
        }

         //Obtener lista de peliculas
        [HttpGet]
        public ActionResult<List<MovieResponseDto>> GetMoviesList()
        {
            List<MovieResponseDto> list = _movieService.GetMoviesList();
            return Ok(list);
        }

        //Obtener pelicula especifico por ID
        [HttpGet("{id}")]
        public ActionResult<MovieResponseDto> GetMovie(int id)
        {
            MovieResponseDto? movieResponseDto = _movieService.GetMovie(id);

            if (movieResponseDto == null) return NotFound();

            return Ok(movieResponseDto);
        }

        //Dar de alta a una nueva pelicula
        //Regresa URI y registro creado
        [HttpPost]
        public ActionResult<MovieResponseDto> CreateMovie(MovieDataDto movieDataDto)
        {
            Console.Write(movieDataDto);
            MovieResponseDto movieResponseDto = _movieService.CreateMovie(movieDataDto);
            return CreatedAtAction(
                nameof(GetMovie),
                new { id = movieResponseDto.Id },
                movieResponseDto
            );
        }

        //Actualizar pelicula existente
        [HttpPut]
        public ActionResult<MovieUpdateResponseDto> UpdateDirector(MovieUpdateDataDto movieUpdateDto)
        {
            MovieUpdateResponseDto? movieUpdateResponseDto = _movieService.UpdateMovie(movieUpdateDto);

            if (movieUpdateResponseDto == null) return NotFound();
            return Ok(movieUpdateResponseDto);
        }

        //Elimia el registro de la pelicula
        [HttpDelete("delete/{id}")]
        public ActionResult DeleteMovie(int id)
        {
            bool wasDeleted = _movieService.DeleteMovie(id);

            if (!wasDeleted) return NotFound();

            return NoContent();
        }
    }
}