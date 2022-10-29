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
            List<ArmazemDto> listDto = list.ConvertAll<ArmazemDto>(armazem => new ArmazemDto{
                Id = armazem.Id.AsGuid(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLon = armazem.Coordenadas.CoordenadaLon, CoordenadaLat = armazem.Coordenadas.CoordenadaLat});

            return listDto;
        }

        public async Task<ArmazemDto> GetByIdAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id);
            
            if(armazem == null)
                return null;

            return new ArmazemDto{Id = armazem.Id.AsGuid(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLon = armazem.Coordenadas.CoordenadaLon, CoordenadaLat = armazem.Coordenadas.CoordenadaLat};
        }

        public async Task<ArmazemDto> AddAsync(CreatingArmazemDto dto)
        {
            var armazem = new Armazem(dto.Designacao, dto.Endereco, dto.Coordenadas);

            await this._repo.AddAsync(armazem);

            await this._unitOfWork.CommitAsync();

            return new ArmazemDto {Id = armazem.Id.AsGuid(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLon = armazem.Coordenadas.CoordenadaLon, CoordenadaLat = armazem.Coordenadas.CoordenadaLat};
        }



        public async Task<ArmazemDto> UpdateAsync(ArmazemDto dto)
        {
            var armazem = await this._repo.GetByIdAsync(new ArmazemId(dto.Id)); 

            if (armazem == null)
                return null;   

            // change all field
       //     armazem.ChangeDescription(dto.Designacao);

            //tentativa
        //    armazem.ChangeArmazemCoordenadas(dto.Coordenadas);

        //armazem.ChangeArmazemEnderco(dto.Endereco);
            
            await this._unitOfWork.CommitAsync();

            //tentativa
            return new ArmazemDto {Id = armazem.Id.AsGuid(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLon = armazem.Coordenadas.CoordenadaLon, CoordenadaLat = armazem.Coordenadas.CoordenadaLat};
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
            return new ArmazemDto{Id = armazem.Id.AsGuid(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLon = armazem.Coordenadas.CoordenadaLon, CoordenadaLat = armazem.Coordenadas.CoordenadaLat};
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
            return new ArmazemDto {Id = armazem.Id.AsGuid(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLon = armazem.Coordenadas.CoordenadaLon, CoordenadaLat = armazem.Coordenadas.CoordenadaLat};
        }
    }
}