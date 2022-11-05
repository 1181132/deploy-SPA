using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Utils;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Armazens
{
    [Owned]
    public class ArmazemDesignacao : IValueObject
    {
        public string Designacao { get; private set; }

        public ArmazemDesignacao(string designacao)
        {
            if (!validaDescricao(designacao))
            {
                throw new BusinessRuleValidationException("A descrição é inválida!!!, não pode ser nula ou ter mais do que 50 caracteres");
            }
            this.Designacao = designacao;
        }

        private static bool validaDescricao(string designacao)
        {
            return designacao.Length >
            Constantes.MIN_COMPRIMENTO_DESCRICAO_ARMAZEM &&
            designacao.Length < Constantes.MAX_COMPRIMENTO_DESCRICAO_ARMAZEM;
        }
    }
}
