using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;
using System.Collections.Generic;

namespace DDDSample1.Domain.Armazens
{
    public class Armazem : Entity<ArmazemId>, IAggregateRoot
    {

        public ArmazemDesignacao Designacao { get; private set; }

        public ArmazemEndereco Endereco { get; private set; }

        public ArmazemCoordenadas Coordenadas { get; private set; }

        public ArmazemAltura Altura { get; private set; }

        public ICollection<Entrega> entregas { get; private set; }

        public bool Active { get; private set; }

        protected Armazem()
        {
            this.Active = true;
        }

        public Armazem(
            ArmazemId id,
            ArmazemDesignacao designacao,
            ArmazemEndereco endereco,
            ArmazemCoordenadas coordenadas,
            ArmazemAltura altura
        )
        {
            this.Id = id;
            this.Designacao = designacao;
            this.Endereco = endereco;
            this.Coordenadas = coordenadas;
            this.Altura = altura;
            this.Active = true;
        }

        public void ChangeDescription(ArmazemDesignacao designacao)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a designacao para um inactivo armazem.");
            this.Designacao = designacao;
        }

        public void ChangeArmazemEnderco(ArmazemEndereco endereco)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar o endereco para um inactivo armazem.");
            this.Endereco = endereco;
        }

        public void ChangeArmazemCoordenadas(ArmazemCoordenadas coordenadas)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar as coordenadas para um inactivo armazem.");
            this.Coordenadas = coordenadas;
        }

        public void ChangeArmazemAltura(ArmazemAltura altura)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar a altura para um inactivo armazem.");
            this.Altura = altura;
        }

        public void ChangeAllFields(ArmazemDesignacao designacao, ArmazemEndereco endereco ,ArmazemCoordenadas coordenadas,
        ArmazemAltura altura)
        {
            if (!this.Active)
                throw new BusinessRuleValidationException("Não é possível alterar todos os parametros para um inativo armazem.");
            this.Designacao = designacao;
            this.Endereco = endereco;
            this.Coordenadas = coordenadas;
            this.Altura = altura;

        }

        public void MarkAsInative()
        {
            this.Active = false;
        }
    }
}
