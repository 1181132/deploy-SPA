using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Entregas
{
    [Owned]
    public class EntregaTempoColocar : IValueObject{
        public int TempoColocar { get; private set;}
        
        public EntregaTempoColocar(int tempoColocar){
           // if(!validaTempo(tempoColocar)){
             //   throw new BusinessRuleValidationException("O valor do tempo tem de ser superior a 0");
           // }
            this.TempoColocar = tempoColocar;
        }

        private static bool validaTempo (int tempoColocar){
            return tempoColocar > 0;
        }
    }
    
}