using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class Armazem : Entity<ArmazemId>, IAggregateRoot
    {
        public ArmazemDesignacao Designacao { get; private set; }

        public ArmazemEndereco Endereco { get; private set; }

        public ArmazemCoordenadas Coordenadas { get; private set; }

        public bool Active { get; private set; }

        private Armazem()
        {
            this.Active = true;
        }

        public Armazem(
            ArmazemDesignacao designacao,
            ArmazemEndereco endereco,
            ArmazemCoordenadas coordenadas
        )
        {
            this.Id = new ArmazemId(Guid.NewGuid());
            this.Designacao = designacao;
            this.Endereco = endereco;
            this.Coordenadas = coordenadas;
            this.Active = true;
        }

        public void ChangeDescription(ArmazemDesignacao designacao)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive armazem.");
            this.Designacao = designacao;
        }

        public void ChangeArmazemEnderco(ArmazemEndereco endereco)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive armazem.");
            this.Endereco = endereco;
        }

        public void ChangeArmazemCoordenadas(ArmazemCoordenadas coordenadas)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive armazem.");
            this.Coordenadas = coordenadas;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}
