using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Entregas
{
    public class Entrega : Entity<EntregaId>, IAggregateRoot
    {

        public string dataEntrega { get;  private set; }

        public string massaEntrega { get;  private set; }

        public string armazemEntrega { get;  private set; }

        public string tempoColocarEntrega { get;  private set; }

        public string tempoRetirarEntrega { get;  private set; }
        

        public bool Active{ get;  private set; }

        private Entrega()
        {
            this.Active = true;
        }

        public Entrega(string code, string dataEntrega, string massaEntrega, string armazemEntrega, string tempoColocarEntrega, string tempoRetirarEntrega)
        {
            this.Id = new EntregaId(code);
            this.dataEntrega= dataEntrega;
            this.massaEntrega=massaEntrega;
            this.armazemEntrega=armazemEntrega;
            this.tempoColocarEntrega=tempoColocarEntrega;
            this.tempoRetirarEntrega=tempoRetirarEntrega;
            this.Active = true;
        }

        public void ChangeDataEntrega(string dataEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data entrega para uma inativa entrega.");
            this.dataEntrega = dataEntrega;
        }

        public void ChangeMassaEntrega(string massaEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data entrega para uma inativa entrega.");
            this.massaEntrega = massaEntrega;
        }

        public void ChangeArmazemEntrega(string armazemEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data entrega para uma inativa entrega.");
            this.armazemEntrega = armazemEntrega;
        }

        public void ChangTempoColocarEntrega(string tempoColocarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data entrega para uma inativa entrega.");
            this.tempoColocarEntrega = tempoColocarEntrega;
        }

        public void ChangeTempoRetirarEntrega(string tempoRetirarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data entrega para uma inativa entrega.");
            this.tempoRetirarEntrega = tempoRetirarEntrega;
        }

        public void ChangeAllFields(string dataEntrega, string massaEntrega, string armazemEntrega, string tempoColocarEntrega, string tempoRetirarEntrega)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a data entrega para uma inativa entrega.");
            this.dataEntrega = dataEntrega;
            this.massaEntrega = massaEntrega;
            this.armazemEntrega = armazemEntrega;
            this.tempoColocarEntrega = tempoColocarEntrega;
            this.tempoRetirarEntrega = tempoRetirarEntrega;
        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}