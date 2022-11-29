using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemService : IArmazemService
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
            
            List<ArmazemDto> listDto = list.ConvertAll<ArmazemDto>(armazem => new ArmazemDto{
                Id = armazem.Id.AsString(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLat = armazem.Coordenadas.CoordenadaLat, CoordenadaLon = armazem.Coordenadas.CoordenadaLon, Altura = armazem.Altura.Altura});

            return listDto;
        }

        public async Task<ArmazemDto> GetByIdAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id);
            
            if(armazem == null)
                return null;

            return new ArmazemDto{Id = armazem.Id.AsString(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLat = armazem.Coordenadas.CoordenadaLat, CoordenadaLon = armazem.Coordenadas.CoordenadaLon, Altura = armazem.Altura.Altura};
        }

        public async Task<ArmazemDto> AddAsync(CreatingArmazemDto dto)
        {
            var armazem = new Armazem(dto.Id, dto.Designacao, dto.Endereco, dto.Coordenadas, dto.Altura);

            await this._repo.AddAsync(armazem);

            await this._unitOfWork.CommitAsync();

            return new ArmazemDto {Id = armazem.Id.AsString(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLat = armazem.Coordenadas.CoordenadaLat, CoordenadaLon = armazem.Coordenadas.CoordenadaLon, Altura = armazem.Altura.Altura};
        }



        public async Task<ArmazemDto> UpdateAsync(ArmazemDto dto)
        {
            var armazem = await this._repo.GetByIdAsync(new ArmazemId(dto.Id)); 

            if (armazem == null)
                return null;   

            // change all field
            armazem.ChangeDescription(new ArmazemDesignacao(dto.Designacao));
            armazem.ChangeArmazemEnderco(new ArmazemEndereco(dto.Rua, dto.NumeroPorta, dto.CodigoPostal, dto.Cidade, dto.Pais));
            armazem.ChangeArmazemCoordenadas(new ArmazemCoordenadas(dto.CoordenadaLat, dto.CoordenadaLon));
            armazem.ChangeArmazemAltura(new ArmazemAltura (dto.Altura));

            armazem.ChangeAllFields(new ArmazemDesignacao(dto.Designacao), new ArmazemEndereco(dto.Rua, dto.NumeroPorta, dto.CodigoPostal, dto.Cidade, dto.Pais),
             new ArmazemCoordenadas(dto.CoordenadaLat, dto.CoordenadaLon), new ArmazemAltura (dto.Altura));
            
            await this._unitOfWork.CommitAsync();

            return new ArmazemDto {Id = armazem.Id.AsString(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                CoordenadaLat = armazem.Coordenadas.CoordenadaLat, CoordenadaLon = armazem.Coordenadas.CoordenadaLon, Altura = armazem.Altura.Altura};
        }

        public async Task<ArmazemDto> InactivateAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id); 

            if (armazem == null)
                return null;   

            // change all fields
            armazem.MarkAsInative();
            
            await this._unitOfWork.CommitAsync();

            return new ArmazemDto{Id = armazem.Id.AsString(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                CoordenadaLat = armazem.Coordenadas.CoordenadaLat, CoordenadaLon = armazem.Coordenadas.CoordenadaLon, Altura = armazem.Altura.Altura};
        }

         public async Task<ArmazemDto> DeleteAsync(ArmazemId id)
        {
            var armazem = await this._repo.GetByIdAsync(id); 

            if (armazem == null)
                return null;   

            if (armazem.Active)
                throw new BusinessRuleValidationException("Não é possivel apagar um armazem activo.");
            
            this._repo.Remove(armazem);
            await this._unitOfWork.CommitAsync();

            return new ArmazemDto {Id = armazem.Id.AsString(), Designacao = armazem.Designacao.Designacao, Rua = armazem.Endereco.Rua, NumeroPorta = armazem.Endereco.NumeroPorta,
                CodigoPostal = armazem.Endereco.CodigoPostal, Cidade = armazem.Endereco.Cidade, Pais = armazem.Endereco.Pais,
                 CoordenadaLat = armazem.Coordenadas.CoordenadaLat, CoordenadaLon = armazem.Coordenadas.CoordenadaLon, Altura = armazem.Altura.Altura};
        }
    }
}