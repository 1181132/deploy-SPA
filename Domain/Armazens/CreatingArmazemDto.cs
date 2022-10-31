namespace DDDSample1.Domain.Armazens
{
    public class CreatingArmazemDto
    {
        public ArmazemDesignacao Designacao { get; set; }

        public ArmazemEndereco Endereco { get; set; }

        public ArmazemCoordenadas Coordenadas { get; set; }

        public CreatingArmazemDto(
            string designacao,
            string rua,
            int numeroPorta,
            string codigoPostal,
            string cidade,
            string pais,
            int coordenadaLon,
            int coordenadaLat
        )
        {
            this.Designacao = new ArmazemDesignacao(designacao);
            this.Endereco =
                new ArmazemEndereco(rua,
                    numeroPorta,
                    codigoPostal,
                    cidade,
                    pais);
            this.Coordenadas =
                new ArmazemCoordenadas(coordenadaLon, coordenadaLat);
        }
    }
}
