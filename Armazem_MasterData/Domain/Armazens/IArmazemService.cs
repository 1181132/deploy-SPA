using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Armazens
{
    public interface IArmazemService
    {
        Task<List<ArmazemDto>> GetAllAsync();
        Task<ArmazemDto> GetByIdAsync(ArmazemId id);
        Task<ArmazemDto> AddAsync(CreatingArmazemDto dto);
        Task<ArmazemDto> UpdateAsync(ArmazemDto dto);
        Task<ArmazemDto> InactivateAsync(ArmazemId id);
        Task<ArmazemDto> DeleteAsync(ArmazemId id);
    }
}