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
        public double CoordenadaLat { get; private set; }

            public double CoordenadaLon { get; private set; }

        public ArmazemCoordenadas(double coordenadaLat, double coordenadaLon )
        {
            if (!validaCoordenadaLat(coordenadaLat))
            {
                throw new BusinessRuleValidationException("Os valores da latitude têm de ser compreendidos entre 90 e -90");
            }
            this.CoordenadaLat = coordenadaLat;
            if (!validaCoordenadaLon(coordenadaLon))
            {
                throw new BusinessRuleValidationException("Os valores da longitude têm de ser compreendidos entre 180 e -180");
            }
            this.CoordenadaLon = coordenadaLon;
            
        }

        private static bool validaCoordenadaLat(double coordenadaLat)
        {
            return coordenadaLat > Constantes.MIN_LAT &&
            coordenadaLat < Constantes.MAX_LAT;
        }

        private static bool validaCoordenadaLon(double coordenadaLon)
        {
            return coordenadaLon > Constantes.MIN_LON &&
            coordenadaLon < Constantes.MAX_LON;
        }

    }
}
