using System;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemDto
    {
        public string Id { get; set; }

        public string Designacao { get; set; }

        public string Rua { get; set; }

        public int NumeroPorta { get; set; }

        public string CodigoPostal { get; set; }

        public string Cidade { get; set; }

        public string Pais { get; set; }

        public double CoordenadaLat { get; set; }

        public double CoordenadaLon { get; set; }

        public double Altura { get; set; }
    }
}
