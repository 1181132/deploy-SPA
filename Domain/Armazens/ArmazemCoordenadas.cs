using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;

namespace DDDSample1.Domain.Armazens
{

    public class ArmazemCoordenadas : IValueObject
    {

        private string Coordenadas { get; set;}

        [JsonConstructor]
        public ArmazemCoordenadas(string value)
            {
            Coordenadas = value;
            }

       
    //    public ArmazemCoordenadas(Guid value) : base(value)
    //    {
    //    }

   //     [JsonConstructor]
  //      public ArmazemCoordenadas(String value) {
  //          this.Coordenadas = value;
  //      }

   //     public Guid AsGuid(){
   //         return (Guid) base.ObjValue;
   //     }
    }
}