using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Entregas
{
    [Owned]
    public class EntregaTempoRetirar : IValueObject{
        public int TempoRetirar { get; private set;}
        
        public EntregaTempoRetirar(int tempoRetirar){
            if(!validaTempo(tempoRetirar)){
                throw new BusinessRuleValidationException("O valor do tempo tem de ser superior a 0");
            }
            this.TempoRetirar=tempoRetirar;
        }

        private static bool validaTempo (int tempoRetirar){
            return tempoRetirar > 0;
        }
    }
    
}