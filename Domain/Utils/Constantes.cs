using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Utils
{
    public class Constantes
    {
        public const int MAX_COMPRIMENTO_DESCRICAO_ARMAZEM = 51;

        public const int MIN_COMPRIMENTO_DESCRICAO_ARMAZEM = 0;

        public const int MAX_COMPRIMENTO_NOME_RUA = Int32.MaxValue;

        public const int MIN_COMPRIMENTO_NOME_RUA = 0;

        public const int MAX_NUMERO_PORTA = Int32.MaxValue;

        public const int MIN_NUMERO_PORTA = 0;

        public const int MAX_COMPRIMENTO_NOME_LOCALIDADE = Int32.MaxValue;

        public const int MIN_COMPRIMENTO_NOME_LOCALIDADE = 0;

        public const int MAX_COMPRIMENTO_NOME_PAIS = Int32.MaxValue;

        public const int MIN_COMPRIMENTO_NOME_PAIS = 0;

        public const int TAMANHO_INDENTIFICADOR_ARMAZEM = 3;

        public const int MAX_LAT = 90;

        public const int MIN_LAT = -90;

        public const int MAX_LON = 180;

        public const int MIN_LON = -180;

        public const string PADRAO_CODIGO_POSTAL = @"(^\d{4}(-\d{3})?$)";

        public const string PADRAO_ALFANUMERICO = @"(^[a-zA-Z0-9]*$)";

        public const string PADRAO_DATA = @"^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$";
    }
}
