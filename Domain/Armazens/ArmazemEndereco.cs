using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Utils;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Armazens
{
    [Owned]
    public class ArmazemEndereco : IValueObject
    {
        public string Rua { get; private set; }

        public int NumeroPorta { get; private set; }

        public string CodigoPostal { get; private set; }

        public string Cidade { get; private set; }

        public string Pais { get; private set; }

        public ArmazemEndereco()
        {
        }

        public ArmazemEndereco(
            string rua,
            int numeroPorta,
            string codigoPostal,
            string cidade,
            string pais
        )
        {
            if (String.IsNullOrEmpty(rua))
            {
                throw new BusinessRuleValidationException("O campo da rua não pode ser vazio!!!");
            }
            this.Rua = rua;

            if (!validaNumeroPorta(numeroPorta))
            {
                throw new BusinessRuleValidationException("O número da porta é inválido!!!");
            }
            this.NumeroPorta = numeroPorta;

            if (!validaCodigoPostal(codigoPostal))
            {
                throw new BusinessRuleValidationException("O código postal é inválido!!!");
            }
            this.CodigoPostal = codigoPostal;

            if (String.IsNullOrEmpty(cidade))
            {
                throw new BusinessRuleValidationException("O campo da cidade não pode ser vazio!!!");
            }
            this.Cidade = cidade;

            if (String.IsNullOrEmpty(pais))
            {
                throw new BusinessRuleValidationException("O campo da pais não pode ser vazio!!!");
            }
            this.Pais = pais;
        }

        private static bool validaNumeroPorta(int numeroPorta)
        {
            return numeroPorta > Constantes.MIN_NUMERO_PORTA;
        }

        private static bool validaCodigoPostal(string codigoPostal)
        {
            return Validacoes
                .ValidaExpressao(codigoPostal, Constantes.PADRAO_CODIGO_POSTAL);
        }

/*        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            return obj is EntityId other && Equals(other);
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public int CompareTo(EntityId other){
            if (other == null)
                return -1;
            return this.Value.CompareTo(other.Value);
        }*/
    }
}