using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;
using System;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaService : IEntregaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IEntregaRepository _repo;
        private readonly IArmazemRepository _repoArm;

        public EntregaService(IUnitOfWork unitOfWork, IEntregaRepository repo, IArmazemRepository repoArm)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._repoArm = repoArm;
        }

        public async Task<List<EntregaDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<EntregaDto> listDto = list.ConvertAll<EntregaDto>(entrega => new EntregaDto{Id = entrega.Id.AsString(), Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId.AsString(),
            TempoColocarEntrega = entrega.TempoColocarEntrega.TempoColocarEntrega,
            TempoRetirarEntrega = entrega.TempoRetirarEntrega.TempoRetirarEntrega});

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
            ArmazemId = entrega.ArmazemId.AsString(),
            TempoColocarEntrega = entrega.TempoColocarEntrega.TempoColocarEntrega,
            TempoRetirarEntrega = entrega.TempoRetirarEntrega.TempoRetirarEntrega};
        }

        public async Task<EntregaDto> AddAsync(CreatingEntregaDto dto)
        {
            //alterar para os outros, ver com o da stora o que ha de diferenças
            await checkArmazemIdAsync(dto.ArmazemId.AsString());
            var entrega = new Entrega(dto.Id, dto.Data, dto.Massa, dto.ArmazemId.AsString(), dto.TempoColocarEntrega, dto.TempoRetirarEntrega);

            await this._repo.AddAsync(entrega);

            await this._unitOfWork.CommitAsync();

            return new EntregaDto { Id = entrega.Id.AsString(), 
            Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId.AsString(),
            TempoColocarEntrega = entrega.TempoColocarEntrega.TempoColocarEntrega,
            TempoRetirarEntrega = entrega.TempoRetirarEntrega.TempoRetirarEntrega };
        }

        public async Task<EntregaDto> UpdateAsync(EntregaDto dto)
        {

            await checkArmazemIdAsync(dto.ArmazemId);
            var entrega = await this._repo.GetByIdAsync(new EntregaId(dto.Id)); 

            if (entrega == null)
                return null;   

            // change all field
            //entrega.ChangeDataEntrega(dto.Description); nao sei se se poe um a um, ou um para todos como embaixo
            entrega.ChangeDataEntrega(dto.Data);
            entrega.ChangeMassaEntrega(dto.Massa);
            entrega.ChangeArmazemEntrega(dto.ArmazemId);
            entrega.ChangeTempoColocarEntrega(dto.TempoColocarEntrega);
            entrega.ChangeTempoRetirarEntrega(dto.TempoRetirarEntrega);
            
            await this._unitOfWork.CommitAsync();

            return new EntregaDto { Id = entrega.Id.AsString(),
            Data = entrega.Data.Data,
            Massa = entrega.Massa.Massa,
            ArmazemId = entrega.ArmazemId.AsString(),
            TempoColocarEntrega = entrega.TempoColocarEntrega.TempoColocarEntrega,
            TempoRetirarEntrega = entrega.TempoRetirarEntrega.TempoRetirarEntrega };
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
            ArmazemId = entrega.ArmazemId.AsString(),
            TempoColocarEntrega = entrega.TempoColocarEntrega.TempoColocarEntrega,
            TempoRetirarEntrega = entrega.TempoRetirarEntrega.TempoRetirarEntrega};
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
            ArmazemId = entrega.ArmazemId.AsString(),
            TempoColocarEntrega = entrega.TempoColocarEntrega.TempoColocarEntrega,
            TempoRetirarEntrega = entrega.TempoRetirarEntrega.TempoRetirarEntrega};
        }

         private async Task checkArmazemIdAsync(String armazemId)
         {
             var armazem = await _repoArm.GetByIdAsync(new ArmazemId(armazemId));
             if (armazem == null)
             {
                 throw new BusinessRuleValidationException("Armazem Id inválido");
             }
         }
    }
}