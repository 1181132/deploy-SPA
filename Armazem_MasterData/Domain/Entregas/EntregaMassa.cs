using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Entregas
{
    [Owned]
    public class EntregaMassa : IValueObject {
        public Double Massa { get; private set;}

        public EntregaMassa(Double massa){
            /*if(!validaMassa(massa)){
                throw new BusinessRuleValidationException("O valor tem de ser superior a 0");
            }*/
            this.Massa = massa;
        }
        
       public Double getValor(){
        return (Double) Massa;
    } 

        private static bool validaMassa(Double massa){
            return massa > 0;
        }
    }

}