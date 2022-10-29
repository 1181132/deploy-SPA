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
        private readonly ArmazemService _service;

        public ArmazensController(ArmazemService service)
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
        public async Task<ActionResult<ArmazemDto>> GetGetById(Guid id)
        {
            var cat = await _service.GetByIdAsync(new ArmazemId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Armazens
        [HttpPost]
        public async Task<ActionResult<ArmazemDto>> Create(CreatingArmazemDto dto)
        {
            var cat = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        
        // PUT: api/Armazens/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArmazemDto>> Update(Guid id, ArmazemDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _service.UpdateAsync(dto);
                
                if (cat == null)
                {
                    return NotFound();
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // Inactivate: api/Armazens/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArmazemDto>> SoftDelete(Guid id)
        {
            var cat = await _service.InactivateAsync(new ArmazemId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }
        
        // DELETE: api/Armazens/5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<ArmazemDto>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new ArmazemId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}