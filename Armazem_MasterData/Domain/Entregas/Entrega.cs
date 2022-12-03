using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;

namespace DDDSample1.Domain.Entregas
{
    public class Entrega : Entity<EntregaId>, IAggregateRoot
    {

        public EntregaData Data { get;  private set; }

        public EntregaMassa Massa { get;  private set; }

        public ArmazemId ArmazemId { get;  private set; }

        public EntregaTempoColocar TempoColocarEntrega { get;  private set; }

        public EntregaTempoRetirar TempoRetirarEntrega { get;  private set; }

        public Armazem Armazem { get; private set; }
        
        public bool Active{ get;  private set; }

        private Entrega()
        {
            this.Active = true;
        }

        public Entrega(EntregaId id, EntregaData  data, EntregaMassa massa, String armazemId, EntregaTempoColocar tempoColocarEntrega, EntregaTempoRetirar tempoRetirarEntrega)
        {
            if(armazemId == null){
                throw new BusinessRuleValidationException("Todas as entregas tem de ter um armazem");
            }
            this.Id = id;
            this.Data = data;
            this.Massa =massa;
            this.ArmazemId = new ArmazemId(armazemId);
            this.TempoColocarEntrega = tempoColocarEntrega;
            this.TempoRetirarEntrega = tempoRetirarEntrega;
            this.Active = true;
        }

        public void ChangeDataEntrega(String data)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data entrega para uma inativa entrega.");
            this.Data = new EntregaData(data);
        }

        public void ChangeMassaEntrega(Double massa)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a massa de uma entrega para uma inativa entrega.");
            this.Massa = new EntregaMassa(massa);
        }

        public void ChangeArmazemEntrega(String armazemId)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o armazem de uma entrega para uma inativa entrega.");
            if(armazemId == null)
                throw new BusinessRuleValidationException("Todas as entregas tem de ter um armazem");
            this.ArmazemId = new ArmazemId(armazemId);
        }

        public void ChangeTempoColocarEntrega(Double tempoColocarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o tempo colocar entrega para uma inativa entrega.");
            this.TempoColocarEntrega = new EntregaTempoColocar(tempoColocarEntrega);
        }

        public void ChangeTempoRetirarEntrega(Double tempoRetirarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o tempo retirar entrega para uma inativa entrega.");
            this.TempoRetirarEntrega = new EntregaTempoRetirar(tempoRetirarEntrega);
        }

        /*public void ChangeAllFields(EntregaData data, EntregaMassa massa, ArmazemId armazemId, EntregaTempoColocar tempoColocarEntrega, EntregaTempoRetirar tempoRetirarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar todos os parametros entrega para uma inativa entrega.");
            this.Data=data;
            this.Massa=massa;
            this.ArmazemId=armazemId;
            this.TempoColocarEntrega=tempoColocarEntrega;
            this.TempoRetirarEntrega=tempoRetirarEntrega;
        }*/

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}