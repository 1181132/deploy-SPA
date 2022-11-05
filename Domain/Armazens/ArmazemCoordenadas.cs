using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Utils;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Armazens
{
    [Owned]
    public class ArmazemCoordenadas : IValueObject
    {
        public int CoordenadaLon { get; private set; }

        public int CoordenadaLat { get; private set; }

        public ArmazemCoordenadas(int coordenadaLon, int coordenadaLat)
        {
            if (!validaCoordenadaLon(coordenadaLon))
            {
                throw new BusinessRuleValidationException("Os valores da longitude têm de ser compreendidos entre 180 e -180");
            }
            this.CoordenadaLon = coordenadaLon;
            if (!validaCoordenadaLat(coordenadaLat))
            {
                throw new BusinessRuleValidationException("Os valores da latitude têm de ser compreendidos entre 90 e -90");
            }
            this.CoordenadaLat = coordenadaLat;
        }

        private static bool validaCoordenadaLon(int coordenadaLon)
        {
            return coordenadaLon > Constantes.MIN_LON &&
            coordenadaLon < Constantes.MAX_LON;
        }

        private static bool validaCoordenadaLat(int coordenadaLat)
        {
            return coordenadaLat > Constantes.MIN_LAT &&
            coordenadaLat < Constantes.MAX_LAT;
        }
    }
}
