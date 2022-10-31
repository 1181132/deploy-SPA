using DDDSample1.Domain.Armazens;

namespace DDDSample1.Domain.Entregas
{
    public class CreatingEntregaDto{

        public string Id { get; private set; }

        public EntregaData Data { get;  private set; }

        public EntregaMassa Massa { get;  private set; }

        public ArmazemId ArmazemId { get;  private set; }

        public EntregaTempoColocar TempoColocarEntrega { get;  private set; }

        public EntregaTempoRetirar TempoRetirarEntrega { get;  private set; }

        public CreatingEntregaDto(string id, string data, int massa, ArmazemId armazemId, int tempoColocar, int tempoRetirar){
            this.Id= id;
            this.Data = new EntregaData(data);
            this.Massa = new EntregaMassa(massa);
            this.ArmazemId = armazemId;
            this.TempoColocarEntrega = new EntregaTempoColocar(tempoColocar);
            this.TempoRetirarEntrega = new EntregaTempoRetirar(tempoRetirar);
        }
    }
}