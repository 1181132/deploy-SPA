using System;
using System.Text.RegularExpressions;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Utils
{
    public class Validacoes
    {

        public static bool ValidaExpressao(string texto, string padrao) 
{
            Regex RE = new Regex(padrao, RegexOptions.Multiline);

            MatchCollection theMatches = RE.Matches(texto);

            return theMatches.Count>0 ? true : false;

}
    }
}
