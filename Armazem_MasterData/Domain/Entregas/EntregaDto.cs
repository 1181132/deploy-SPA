using System;
using DDDSample1.Domain.Armazens;


namespace DDDSample1.Domain.Entregas
{
    public class EntregaDto
    {
        public string Id { get; set; }

        public string Data { get; set; }

        public int Massa { get; set; }

        public ArmazemId ArmazemId { get; set; }

        public int TempoColocarEntrega { get; set; }

        public int TempoRetirarEntrega { get; set; }
    }
}