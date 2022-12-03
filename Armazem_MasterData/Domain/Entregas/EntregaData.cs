using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Utils;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Entregas
{
    [Owned]
    public class EntregaData : IValueObject{
        
        public String Data { get; private set;}

        public EntregaData(String data){
           /* if(!validaData(data)){
                throw new BusinessRuleValidationException("A data não se encontra dentro dos parametros dia,mes,ano (ex: dd-mm-aaaa, dd/mm/aaaa, dd.mm.aaaa)");
                
            } */
            this.Data=data;
    }

        /*private static bool validaData(String data){
            return Validacoes.ValidaExpressao(data,Constantes.PADRAO_DATA);
        } */
    }
}