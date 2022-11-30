using System;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Armazens
{
    [Owned]
    public class ArmazemAltura : IValueObject {
        public double Altura { get; private set;}

        public ArmazemAltura(double altura){
        //    if(!validaAltura(altura)){
        //        throw new BusinessRuleValidationException("O valor tem de ser superior a 0");
        //    }
            this.Altura = altura;
        }
        
        private static bool validaAltura(double altura){
            return String.IsNullOrEmpty(altura.ToString());
        }
    }

}