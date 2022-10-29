using System;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemDto
    {
        public Guid Id { get; set; }

        public string Description { get; set; }

// tentativa
        public ArmazemCoordenadas Coordenadas { get; set;}
    }
}