using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaId : EntityId
    {
        public string Id { get; private set; }

        public EntregaId(string value):base(value)
        {

        }
        
        protected override Object createFromString(string text){
            return text;
        }
        
        public override string AsString(){
            return (string) base.Value;
        }
    }
}