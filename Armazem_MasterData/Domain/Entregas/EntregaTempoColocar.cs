using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Entregas
{
    [Owned]
    public class EntregaTempoColocar : IValueObject{
        public Double TempoColocarEntrega { get; private set;}
        
        public EntregaTempoColocar(Double tempoColocarEntrega){
            /*if(!validaTempo(tempoColocarEntrega)){
                throw new BusinessRuleValidationException("O valor do tempo tem de ser superior a 0");
            }*/
            this.TempoColocarEntrega = tempoColocarEntrega;
        }

        private static bool validaTempo (Double tempoColocarEntrega){
            return tempoColocarEntrega > 0;
        }
    }
    
}