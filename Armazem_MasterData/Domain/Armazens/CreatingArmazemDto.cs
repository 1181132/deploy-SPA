namespace DDDSample1.Domain.Armazens
{
    public class CreatingArmazemDto
    {
        public ArmazemId Id { get; set; }

        public ArmazemDesignacao Designacao { get; set; }

        public ArmazemEndereco Endereco { get; set; }

        public ArmazemCoordenadas Coordenadas { get; set; }

        public ArmazemAltura Altura { get; set;}

        public CreatingArmazemDto(
            string id,
            string designacao,
            string rua,
            int numeroPorta,
            string codigoPostal,
            string cidade,
            string pais,
            double coordenadaLat,
            double coordenadaLon,          
            double altura 
        )
        {
            this.Id = new ArmazemId(id);
            this.Designacao = new ArmazemDesignacao(designacao);
            this.Endereco =
                new ArmazemEndereco(rua,
                    numeroPorta,
                    codigoPostal,
                    cidade,
                    pais);
            this.Coordenadas =
                new ArmazemCoordenadas(coordenadaLat, coordenadaLon);

            this.Altura = new ArmazemAltura(altura);
        }
    }
}
