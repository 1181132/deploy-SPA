using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class Armazem : Entity<ArmazemId>, IAggregateRoot
    {
     
        public string Description { get;  private set; }

        // tentativa
        public ArmazemCoordenadas Coordenadas { get; private set;  }

        public bool Active{ get;  private set; }

        private Armazem()
        {
            this.Active = true;
        }

        public Armazem(string description, ArmazemCoordenadas coordenadas)
        {
            this.Id = new ArmazemId(Guid.NewGuid());
            this.Description = description;
            this.Coordenadas = coordenadas;
            this.Active = true;
        }

        public void ChangeDescription(string description)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive armazem.");
            this.Description = description;
        }

        public void ChangeArmazemCoordenadas(ArmazemCoordenadas Coordenadas)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("It is not possible to change the description to an inactive armazem.");
            this.Coordenadas = Coordenadas;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}