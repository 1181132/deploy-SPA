using System;
using DDDSample1.Domain.Armazens;


namespace DDDSample1.Domain.Entregas
{
    public class EntregaDto
    {
        public string Id { get; set; }

        public string Data { get; set; }

        public double Massa { get; set; }

        public string ArmazemId { get; set; }

        public double TempoColocarEntrega { get; set; }

        public double TempoRetirarEntrega { get; set; }
    }
}