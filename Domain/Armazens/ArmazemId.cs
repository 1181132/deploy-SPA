using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Utils;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemId : EntityId
    {
        [JsonConstructor]
        public ArmazemId(Guid value) :
            base(value)
        {
        }

        public ArmazemId(String value) :
            base(value)
        {
        }

        protected override Object createFromString(String text)
        {
            return new Guid(text);
        }

        public override String AsString()
        {
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }

        public Guid AsGuid()
        {
            return (Guid) base.ObjValue;
        }


        private static bool validaTamanhoId(string value)
        {
            return value.Length > Constantes.MIN_MAX_INDENTIFICADOR_ARMAZEM &&
            value.Length < Constantes.MAX_INDENTIFICADOR_ARMAZEM;
        }

        private static bool validaSeAlfanumerico(string value)
        {
            return Validacoes
                .ValidaExpressao(value, Constantes.PADRAO_ALFANUMERICO);
        }
    }
}
