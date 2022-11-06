using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Entregas
{
    public interface IEntregaService
    {
        Task<List<EntregaDto>> GetAllAsync();
        Task<EntregaDto> GetByIdAsync(EntregaId id);
        Task<EntregaDto> AddAsync(CreatingEntregaDto dto);
        Task<EntregaDto> UpdateAsync(EntregaDto dto);
        Task<EntregaDto> InactivateAsync(EntregaId id);
        Task<EntregaDto> DeleteAsync(EntregaId id);
    }
}