using crud.Dtos.director;
using crud.Models;
using crud.Repositories;

namespace crud.Service
{
    //Servicio que contiene la logica de negocio para operaciones con directores
    public class DirectorService
    {
        //Dependencia: Repositorio de Director
        private readonly DirectorRepository _directorRepository;

        public DirectorService(DirectorRepository directorRepository)
        {
            this._directorRepository = directorRepository; //Inyección de depedencia
        }

        //Obtener lista de directores
        public List<DirectorResponseDto> GetDirectorsList()
        {
            List<Director> director = _directorRepository.GetDirectorsList();

            //Cada instancia "director" se mapea a "DirectorResponseDto"
            return director.Select(director => new DirectorResponseDto(director)).ToList();
        }

        //Obtener director por ID
        public DirectorResponseDto? GetDirector(int id)
        {
            Director? director = _directorRepository.GetDirector(id);

            if (director == null) return null;

            return new DirectorResponseDto(director);
        }

        //Crear nuevo director
        public DirectorResponseDto CreateDirector(DirectorDataDto directorDataDto)
        {
            Director newDirector = new Director(directorDataDto);

            _directorRepository.CreateDirector(newDirector);

            return new DirectorResponseDto(newDirector);
        }

        //Actualizar registro de director existente
        public DirectorUpdateResponseDto? UpdateDirector(DirectorUpdateDataDto directorUpdateDataDto)
        {
            Director? director = GetDirectorIfExists(directorUpdateDataDto.Id);

            if (director == null) return null;

            _directorRepository.UpdateDirector(director, directorUpdateDataDto);

            return new DirectorUpdateResponseDto(director);

        }

        //Delete logico por ID
        public bool DeactivateDirector(int id)
        {
            Director? director = GetDirectorIfExists(id);

            if (director == null) return false;

            _directorRepository.DeactivateDirector(director);

            return true;
        }

        //Eliminacion permanente del registro
        public bool DeleteDirector(int id)
        {
            Director? director = GetDirectorIfExists(id);

            if (director == null) return false;

            _directorRepository.DeleteDirector(director);
            return true;
        }

        //Obtener director
        private Director? GetDirectorIfExists(int id)
        {
            Director? director = _directorRepository.GetDirector(id);

            if (director == null) return null;

            return director;
        }
    }
}