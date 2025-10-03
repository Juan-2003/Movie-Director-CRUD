using crud.Dtos.director;
using crud.Models;

namespace crud.Repositories
{
    //Repositorio para operaciones y consultas de Director en la BD
    public class DirectorRepository
    {
        //Contexto de Entity Framework para acceso a la BD
        private readonly CrudContext _context;

        public DirectorRepository(CrudContext context)
        {
            this._context = context;//Inyeccion de dependencia
        }

        //Obtener lista de directores
        public List<Director> GetDirectorsList()
        {
            return _context.Directors.ToList();
        }

        //Obtener director por ID
        public Director? GetDirector(int id)
        {
            return _context.Directors.FirstOrDefault(d => d.Id == id);
        }

        //Crear nuevo director
        public void CreateDirector(Director director)
        {
            _context.Directors.Add(director);
            _context.SaveChanges();
        }

         //Actualizar registro de director existente
        public void UpdateDirector(Director director, DirectorUpdateDataDto directorUpdateDataDto)
        {
            director.updateDirector(directorUpdateDataDto);
            _context.SaveChanges();
        }

        //Delete logico
        public void DeactivateDirector(Director director)
        {
            director.Active = false;
            _context.SaveChanges();
        }

        //Eliminacion permanente
        public void DeleteDirector(Director director)
        {
            _context.Directors.Remove(director);
            _context.SaveChanges();
        }
    }
}