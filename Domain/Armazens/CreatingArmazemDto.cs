namespace DDDSample1.Domain.Armazens
{
    public class CreatingArmazemDto
    {
        public string Description { get; set; }

        //tentativa
        public ArmazemCoordenadas Coordenadas { get; set; }

        public CreatingArmazemDto(string description, string coordenadas )
        {
            this.Description = description;

            this.Coordenadas = new ArmazemCoordenadas(coordenadas);
        }
    }
}