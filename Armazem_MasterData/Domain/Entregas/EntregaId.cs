using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaId : EntityId
    {
        public string Id { get; private set; }

        public EntregaId(String value):base(value)
        {

        }
        
        protected override Object createFromString(String text){
            return text;
        }
        
        public override String AsString(){
            return (String) base.Value;
        }
    }
}