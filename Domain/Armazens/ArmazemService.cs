using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IArmazemRepository _repo;

        public ArmazemService(IUnitOfWork unitOfWork, IArmazemRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<List<ArmazemDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            //ver depois
            List<ArmazemDto> listDto = list.ConvertAll<ArmazemDto>(cat => new ArmazemDto{Id = cat.Id.AsGuid(), Description = cat.Description});

            return listDto;
        }

        public async Task<ArmazemDto> GetByIdAsync(ArmazemId id)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;

            //ver depois
            return new ArmazemDto{Id = cat.Id.AsGuid(), Description = cat.Description};
        }

        public async Task<ArmazemDto> AddAsync(CreatingArmazemDto dto)
        {
            //tentativa
            var armazem = new Armazem(dto.Description , dto.Coordenadas);

            await this._repo.AddAsync(armazem);

            await this._unitOfWork.CommitAsync();

//mexi aqui tambem
            return new ArmazemDto { Id = armazem.Id.AsGuid(), Description = armazem.Description, Coordenadas = armazem.Coordenadas };
        }



        public async Task<ArmazemDto> UpdateAsync(ArmazemDto dto)
        {
            var armazem = await this._repo.GetByIdAsync(new ArmazemId(dto.Id)); 

            if (armazem == null)
                return null;   

            // change all field
            armazem.ChangeDescription(dto.Description);

            //tentativa
            armazem.ChangeArmazemCoordenadas(dto.Coordenadas);
            
            await this._unitOfWork.CommitAsync();

            //tentativa
            return new ArmazemDto { Id = armazem.Id.AsGuid(), Description = armazem.Description, Coordenadas = armazem.Coordenadas };
        }

        public async Task<ArmazemDto> InactivateAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id); 

            if (armazem == null)
                return null;   

            // change all fields
            armazem.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            //tentativa
            return new ArmazemDto { Id = armazem.Id.AsGuid(), Description = armazem.Description, Coordenadas = armazem.Coordenadas };
        }

         public async Task<ArmazemDto> DeleteAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id); 

            if (armazem == null)
                return null;   

            if (armazem.Active)
                throw new BusinessRuleValidationException("It is not possible to delete an active armazem.");
            
            this._repo.Remove(armazem);
            await this._unitOfWork.CommitAsync();

            //tentativa
            return new ArmazemDto { Id = armazem.Id.AsGuid(), Description = armazem.Description, Coordenadas = armazem.Coordenadas };
        }
    }
}