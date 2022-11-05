using Microsoft.AspNetCore.Mvc;
using DDDSample1.Infrastructure;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigEnvController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;

        public ConfigEnvController(DDDSample1DbContext context)
        {
            _context = context;
        }

        [HttpDelete]
        public ActionResult<string> DropDB()
        {
           _context.Database.EnsureDeleted();

           return Ok("Todas as informações fora removidas.");
        }
        [HttpPost]
        public ActionResult<string> CreateDB()
        {
           _context.Database.EnsureCreated();

           return Ok("A base de dados foi criada.");
        }
    }
}