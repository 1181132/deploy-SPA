using DDDSample1.Domain.Armazens;
using System;

namespace DDDSample1.Domain.Entregas
{
    public class CreatingEntregaDto{

        public EntregaId Id { get; set; }

        public EntregaData Data { get; set; }

        public EntregaMassa Massa { get; set; }

        public ArmazemId ArmazemId { get; set; }

        public EntregaTempoColocar TempoColocarEntrega { get; set; }

        public EntregaTempoRetirar TempoRetirarEntrega { get; set; }

        public CreatingEntregaDto(String id, String data, Double massa, String armazemId, Double tempoColocar, Double tempoRetirar){
            this.Id= new EntregaId(id);
            this.Data = new EntregaData(data);
            this.Massa = new EntregaMassa(massa);
            this.ArmazemId = new ArmazemId(armazemId);
            this.TempoColocarEntrega = new EntregaTempoColocar(tempoColocar);
            this.TempoRetirarEntrega = new EntregaTempoRetirar(tempoRetirar);
        }
    }
}