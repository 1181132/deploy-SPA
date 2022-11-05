using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Utils;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemId : EntityId
    {
        public string Id { get; private set; }

        //     [JsonConstructor]
        //     public ArmazemId(Guid value) :
        //         base(value)
        //     {
        //     }

        public ArmazemId(String value) :
            base(value)
        {
            if (!validaSeAlfanumerico(value) || !validaTamanhoId(value))
            {
                throw new BusinessRuleValidationException("O id do armazem contem caracters não alfanuméricos ou tem um tamanho errado");
            }
            this.Id = value;
        }

        protected override Object createFromString(string text)
        {
            return text;
        }

        public override String AsString()
        {
            //     Guid obj = (Guid) base.ObjValue;
            //    return obj.ToString();
            return (String) base.Value;
        }

        //    public Guid AsGuid()
        //    {
        //        return (Guid) base.ObjValue;
        //    }
        private static bool validaTamanhoId(string value)
        {
            return value.Length == Constantes.TAMANHO_INDENTIFICADOR_ARMAZEM;
        }

        private static bool validaSeAlfanumerico(string value)
        {
            return Validacoes
                .ValidaExpressao(value, Constantes.PADRAO_ALFANUMERICO);
        }
    }
}
