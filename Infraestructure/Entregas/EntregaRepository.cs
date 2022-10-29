using DDDSample1.Domain.Entregas;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Entregas
{
    public class EntregaRepository : BaseRepository<Entrega, EntregaId>, IEntregaRepository
    {
      
        public EntregaRepository(DDDSample1DbContext context):base(context.Entregas)
        {
            
        }

    }
}