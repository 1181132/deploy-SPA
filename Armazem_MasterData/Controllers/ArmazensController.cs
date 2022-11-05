using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmazensController : ControllerBase
    {
        private readonly IArmazemService _service;

        public ArmazensController(IArmazemService service)
        {
            _service = service;
        }

        // GET: api/Armazens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArmazemDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Armazens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ArmazemDto>> GetGetById(String id)
        {
            var armazem = await _service.GetByIdAsync(new ArmazemId(id));

            if (armazem == null)
            {
                return NotFound();
            }

            return armazem;
        }

        // POST: api/Armazens
        [HttpPost]
        public async Task<ActionResult<ArmazemDto>> Create(CreatingArmazemDto dto)
        {
            var armazem = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = armazem.Id }, armazem);
        }

        
        // PUT: api/Armazens/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArmazemDto>> Update(String id, ArmazemDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var armazem = await _service.UpdateAsync(dto);
                
                if (armazem == null)
                {
                    return NotFound();
                }
                return Ok(armazem);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Armazens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArmazemDto>> SoftDelete(String id)
        {
            var armazem = await _service.InactivateAsync(new ArmazemId(id));

            if (armazem == null)
            {
                return NotFound();
            }

            return Ok(armazem);
        }
        
        // DELETE: api/Armazens/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<ArmazemDto>> HardDelete(String id)
        {
            try
            {
                var armazem = await _service.DeleteAsync(new ArmazemId(id));

                if (armazem == null)
                {
                    return NotFound();
                }

                return Ok(armazem);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}