using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntregaRepository _repo;

        public EntregaService(IUnitOfWork unitOfWork, IEntregaRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<EntregaDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<EntregaDto> listDto = list.ConvertAll<EntregaDto>(entrega => new EntregaDto{Id = entrega.Id.AsString(), Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId,
            TempoColocarEntrega = entrega.TempoColocar.TempoColocar,
            TempoRetirarEntrega = entrega.TempoRetirar.TempoRetirar});

            return listDto;
        }

        public async Task<EntregaDto> GetByIdAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id);
            
            if(entrega == null)
                return null;

            return new EntregaDto{Id = entrega.Id.AsString(),
            Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId,
            TempoColocarEntrega = entrega.TempoColocar.TempoColocar,
            TempoRetirarEntrega = entrega.TempoRetirar.TempoRetirar};
        }

        public async Task<EntregaDto> AddAsync(CreatingEntregaDto dto)
        {
            var entrega = new Entrega(dto.Id, dto.Data, dto.Massa, dto.ArmazemId, dto.TempoColocarEntrega, dto.TempoRetirarEntrega);

            await this._repo.AddAsync(entrega);

            await this._unitOfWork.CommitAsync();

            return new EntregaDto { Id = entrega.Id.AsString(),
            Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId,
            TempoColocarEntrega = entrega.TempoColocar.TempoColocar,
            TempoRetirarEntrega = entrega.TempoRetirar.TempoRetirar };
        }

        public async Task<EntregaDto> UpdateAsync(EntregaDto dto)
        {
            var entrega = await this._repo.GetByIdAsync(new EntregaId(dto.Id)); 

            if (entrega == null)
                return null;   

            // change all field
            //entrega.ChangeDataEntrega(dto.Description); nao sei se se poe um a um, ou um para todos como embaixo
            entrega.ChangeDataEntrega(new EntregaData(dto.Data));
            entrega.ChangeMassaEntrega(new EntregaMassa(dto.Massa));
            entrega.ChangeArmazemEntrega(dto.ArmazemId);
            entrega.ChangeTempoColocarEntrega(new EntregaTempoColocar(dto.TempoColocarEntrega));
            entrega.ChangeTempoRetirarEntrega(new EntregaTempoRetirar(dto.TempoRetirarEntrega));
            
            await this._unitOfWork.CommitAsync();

            return new EntregaDto { Id = entrega.Id.AsString(),
            Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId,
            TempoColocarEntrega = entrega.TempoColocar.TempoColocar,
            TempoRetirarEntrega = entrega.TempoRetirar.TempoRetirar };
        }

        public async Task<EntregaDto> InactivateAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id); 

            if (entrega == null)
                return null;   

            // change all fields
            entrega.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new EntregaDto { Id = entrega.Id.AsString(),
            Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId,
            TempoColocarEntrega = entrega.TempoColocar.TempoColocar,
            TempoRetirarEntrega = entrega.TempoRetirar.TempoRetirar};
        }

         public async Task<EntregaDto> DeleteAsync(EntregaId id)
        {
            var entrega = await this._repo.GetByIdAsync(id); 

            if (entrega == null)
                return null;   

            if (entrega.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active entrega.");
            
            this._repo.Remove(entrega);
            await this._unitOfWork.CommitAsync();

            return new EntregaDto { Id = entrega.Id.AsString(),
            Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId,
            TempoColocarEntrega = entrega.TempoColocar.TempoColocar,
            TempoRetirarEntrega = entrega.TempoRetirar.TempoRetirar};
        }
    }
}