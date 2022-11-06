using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using System.Linq;
using Moq;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Controllers;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;

namespace dotNetUnitTestes.Entregas{


    [Collection("Sequential")]

public class EntregasControllerTeste
{
    IEntregaService theMockedService;
    

        List<EntregaDto> testList;

        public EntregasControllerTeste()
        {
            testList = new List<EntregaDto>();
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);
            
            var i2 = new ArmazemId("as2");
            var d2 = new ArmazemDesignacao("Armazem1");
            var e2 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c2 = new ArmazemCoordenadas(50,44);
            var a2 = new Armazem(i2,d2,e2,c2);

            testList.Add(new EntregaDto(){
                Id = "1",
                Data = "20-10-2022",
                Massa = 10,
                ArmazemId = a1.Id,
                TempoColocarEntrega = 10,
                TempoRetirarEntrega = 15
            });

            testList.Add(new EntregaDto(){
                Id = "2",
                Data = "20-10-2022",
                Massa = 20,
                ArmazemId = a1.Id,
                TempoColocarEntrega = 20,
                TempoRetirarEntrega = 25
            });

            testList.Add(new EntregaDto(){
                Id = "3",
                Data = "20-10-2022",
                Massa = 30,
                ArmazemId = a1.Id,
                TempoColocarEntrega = 30,
                TempoRetirarEntrega = 35
            });

            var entregaAtualizado= new EntregaDto(){ //que se faz neste
                Id=testList[0].Id,
                Data = testList[0].Data,
                Massa= testList[0].Massa, 
                ArmazemId = a1.Id,
                TempoColocarEntrega = 20,
                TempoRetirarEntrega = 30
            };
            
            var novoEntrega = new EntregaDto(){ //igual
                Id="6" ,
                Data = "20-11-2000" ,
                Massa = 55 ,
                ArmazemId = a2.Id ,
                TempoColocarEntrega = 10 ,
                TempoRetirarEntrega = 40
            };

            var srv = new Mock<IEntregaService>();
            
            srv.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(testList));
            srv.Setup(x => x.GetByIdAsync(new EntregaId(testList[0].Id))).Returns(Task.FromResult(testList[0]));

            srv.Setup(x => x.UpdateAsync(It.Is<EntregaDto>(j => Guid.Equals(j.Id, testList[0].Id)))).Returns(Task.FromResult(entregaAtualizado));
            
            srv.Setup(x => x.AddAsync(It.Is<CreatingEntregaDto>(c => c.Massa.Massa.Equals("ValorInvalido")))).Returns(Task.FromException<EntregaDto>(new BusinessRuleValidationException("O valor fornecido não é valido.")));               
            srv.Setup(x => x.AddAsync(It.Is<CreatingEntregaDto>(c => !c.Massa.Massa.Equals("ValorInvalido")))).Returns(Task.FromResult(novoEntrega));

            theMockedService = srv.Object;
        }

        [Fact]
        public async Task GetAllEntregasAsync_ShouldReturnAllEntregasAsync()
        {
            //Arrange
            var theController = new EntregasController(theMockedService);

            //Act
            var result = await theController.GetAll();

            //Assert
            var tags = Assert.IsType<List<EntregaDto>>(result.Value);
            Assert.Equal(3,tags.Count());
        }

        [Fact]
        public async Task GetEntregasAsync_ShouldReturnNotFound()
        {
            // Arrange      
            var theController = new EntregasController(theMockedService);
            var testEntregaId = "as5";

            // Act
            var response = await theController.GetGetById(testEntregaId);

            //Assert       
            Assert.IsType<NotFoundResult>(response.Result);
        }

        [Fact]
        public async Task GetEntregaAsync_ShouldReturnTask()
        {
            // Arrange       
            var theController = new EntregasController(theMockedService);
            var testTagId = testList[0].Id;

            // Act
            var result = await theController.GetGetById(testTagId);

            //Assert     
            Assert.IsType<EntregaDto>(result.Value);
        }

        [Fact]
        public async Task GetEntregaAsync_ShouldReturnTheRigthTaskAsync()
        {
            // Arrange       
            var theController = new EntregasController(theMockedService);
            var testEntregaId = testList[0].Id;

            // Act
            var result = await theController.GetGetById(testEntregaId);
            var entrega=result.Value;

            //Assert     
            Assert.Equal(testEntregaId, (entrega as EntregaDto).Id);
        }
//--------------------------------falta esta parte para baixo
        [Fact]
        public async Task PutEntregaNaoExistente_ShouldReturnNotFound()
        {
            // Arrange     
            var theController = new EntregasController(theMockedService);
            var testEntregaNaoExistenteId = "10";
            
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var novaInfo = new EntregaDto()
            {
                Id=testEntregaNaoExistenteId,
                Massa = 10,
                ArmazemId = a1.Id,
                Data = "20-10-2020",
                TempoColocarEntrega = 10,
                TempoRetirarEntrega = 10
            };

            // Act
            var response = await theController.Update(testEntregaNaoExistenteId, novaInfo);

            //Assert       
            Assert.IsType<NotFoundResult>(response.Result);
        }

   /*     [Fact]
        public async Task PutarmazemInfoInconsistente_ShouldReturnBadRequest()
        {
            // Arrange     
            var theController = new ArmazensController(theMockedService);
            var testArmazemId = "as5";

            var novaInfo = new ArmazemDto()
            {
                Id=testList[0].Id,
                Designacao = "Armazem5" ,
                Rua = "rua do piramide",
                NumeroPorta = 1334,
                CodigoPostal = "1234-321",
                Cidade = "Braga",
                Pais = "Portugal",
                CoordenadaLon = 20,
                CoordenadaLat = 14
            };

            // Act
            var response = await theController.Update(testArmazemId, novaInfo);

            //Assert       
            Assert.IsType<BadRequestResult>(response.Result);
        }*/
   

        [Fact]
        public async Task PutEntregaExistente_ShouldReturnArmazemDTO()
        {
            // Arrange     
            var theController = new EntregasController(theMockedService);
            var testEntregaExistenteId = testList[0].Id;
            
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var novaInfo = new EntregaDto()
            {
                Id=testEntregaExistenteId,
                Data = "20-10-2020",
                Massa = 10,
                ArmazemId = a1.Id,
                TempoColocarEntrega = 10,
                TempoRetirarEntrega = 10
            };

            // Act
            var response = (await theController.Update(testEntregaExistenteId, novaInfo));


            //Assert       
            Assert.IsType<ActionResult<EntregaDto>>(response);
        }
        
        [Fact]
        public async Task PutEntregaExistente_ShouldReturnUpdatedInfo()
        {
            // Arrange     
            var theController = new EntregasController(theMockedService);
            var testEntregaExistenteId = testList[0].Id;
            
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var novaInfo = new EntregaDto()
            {
                Id=testEntregaExistenteId,
                Data = "20-10-2022",
                Massa = 10,
                ArmazemId = a1.Id,
                TempoColocarEntrega = 20,
                TempoRetirarEntrega = 30
            };

            // Act
            var response = (await theController.Update(testEntregaExistenteId, novaInfo)).Result;
            var result = (response as OkObjectResult).Value as EntregaDto;

            //Assert     
            Assert.Equal(novaInfo.Id,result.Id);
            Assert.Equal(novaInfo.Data,result.Data);
            Assert.Equal(novaInfo.Massa,result.Massa);
            Assert.Equal(novaInfo.ArmazemId,result.ArmazemId);
            Assert.Equal(novaInfo.TempoColocarEntrega,result.TempoColocarEntrega);
            Assert.Equal(novaInfo.TempoRetirarEntrega,result.TempoRetirarEntrega);
        }

        
   /*     [Fact]
        public async Task PostEntregaDataInvalidaAsync_ShouldReturnBadRequest()
        {
            // Arrange     
            var theController = new EntregasController(theMockedService);

            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var entregaComDataInvalida = new CreatingEntregaDto("10", "20092022",10,a1.Id,20,25);
            
            // Act
            Func<Task> result = async () => await theController.Create(entregaComDataInvalida);

            // Assert            
            await Assert.ThrowsAsync<BusinessRuleValidationException>(result);   //nao cria entrega com data invalida e da erro nisso
        }*/
        
  /*      [Fact]
        public async Task PostEntregaArmazemInvalidoAsync_ShouldReturnBadRequest()
        {
            // Arrange     
            var theController = new EntregasController(theMockedService);

            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var entregaComDataInvalida = new CreatingEntregaDto("10", "20-09-2022",10,new ArmazemId("123"),20,25);
            
            // Act
            Func<Task> result = async () => await theController.Create(entregaComDataInvalida);

            // Assert            
            await Assert.ThrowsAsync<BusinessRuleValidationException>(result);
        }*/

        [Fact]
        public async Task PostValidaEntregaAsync_ShouldReturnCreatedResponse()
        {
            // Arrange     
            var theController = new EntregasController(theMockedService);
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var novaEntrega = new CreatingEntregaDto("77","30-06-2023",10,a1.Id,15,20);
 
            // Act
            var response = await theController.Create(novaEntrega);

            // Assert
            Assert.IsType<CreatedAtActionResult>(response.Result);
        }        
    }
}