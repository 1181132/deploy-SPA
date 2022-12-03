using System;
using DDDSample1.Domain.Armazens;


namespace DDDSample1.Domain.Entregas
{
    public class EntregaDto
    {
        public String Id { get; set; }

        public String Data { get; set; }

        public Double Massa { get; set; }

        public String ArmazemId { get; set; }

        public Double TempoColocarEntrega { get; set; }

        public Double TempoRetirarEntrega { get; set; }
    }
}