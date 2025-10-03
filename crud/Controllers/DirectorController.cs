using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using crud.Dtos.director;
using crud.Models;
using crud.Service;
using Microsoft.AspNetCore.Mvc;

//Controlador para gestionar operaciones CRUD de directores.
namespace crud.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DirectorController : ControllerBase
    {

        //Dependencia: Service de director
        private readonly DirectorService _directorService;

        public DirectorController(DirectorService directorService)
        {
            this._directorService = directorService; // Inyección de dependencia
        }

        //Obtener lista de directores
        [HttpGet]
        public ActionResult<List<DirectorResponseDto>> GetDirectorsList()
        {
            List<DirectorResponseDto> list = _directorService.GetDirectorsList();
            return Ok(list);
        }

        //Obtener director especifico por ID
        [HttpGet("{id}")]
        public ActionResult<DirectorResponseDto> GetDirector(int id)
        {
            DirectorResponseDto? directorResponseDto = _directorService.GetDirector(id);

            if (directorResponseDto == null) return NotFound();

            return Ok(directorResponseDto);
        }

        //Dar de alta a un nuevo director
        //Regresa URI y registro creado
        [HttpPost]
        public ActionResult<DirectorResponseDto> CreateDirector(DirectorDataDto directorDataDto)
        {
            DirectorResponseDto directorResponseDto = _directorService.CreateDirector(directorDataDto);
            return CreatedAtAction(
                nameof(GetDirector),
                new { id = directorResponseDto.Id },
                directorResponseDto
            );
        }

        //Actualizar director existente
        [HttpPut]
        public ActionResult<DirectorUpdateResponseDto> UpdateDirector(DirectorUpdateDataDto directorUpdateDataDto)
        {
            DirectorUpdateResponseDto? directorUpdateResponseDto = _directorService.UpdateDirector(directorUpdateDataDto);

            if (directorUpdateResponseDto == null) return NotFound();
            return Ok(directorUpdateResponseDto);
        }

        //Delete logico: Atributo "activate" pasa a false
        [HttpPatch("deactivate/{id}")]
        public ActionResult DeactivateDirector(int id)
        {
            bool wasDeactivated = _directorService.DeactivateDirector(id);

            if (!wasDeactivated) return NotFound();

            return NoContent();
        }

        //Elimia el registro del director
        [HttpDelete("delete/{id}")]
        public ActionResult DeleteDirector(int id)
        {
            bool wasDeleted = _directorService.DeleteDirector(id);

            if (!wasDeleted) return NotFound();

            return NoContent();
        }


    }
}