using System;


namespace DDDSample1.Domain.Entregas
{
    public class EntregaDto
    {
        public String Id { get; set; }

        public string dataEntrega { get; set; }

        public string massaEntrega { get; set; }

        public string armazemEntrega { get; set; }

        public string tempoColocarEntrega { get; set; }

        public string tempoRetirarEntrega { get; set; }
    }
}