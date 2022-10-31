using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Entregas
{
    [Owned]
    public class EntregaMassa : IValueObject {
        public int Massa { get; private set;}

        public EntregaMassa(int massa){
            if(!validaMassa(massa)){
                throw new BusinessRuleValidationException("O valor tem de ser superior a 0");
            }
            this.Massa = massa;
        }
        
        private static bool validaMassa(int massa){
            return massa > 0;
        }
    }

}