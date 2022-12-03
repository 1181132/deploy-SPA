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

namespace dotNetUnitTestes.Armazens{


    [Collection("Sequential")]

public class ArmazensControllerTeste
{
    IArmazemService theMockedService;

        List<ArmazemDto> testList;

        public ArmazensControllerTeste()
        {
            testList = new List<ArmazemDto>();

            testList.Add(new ArmazemDto(){
                Id="as1", 
                Designacao = "Armazem1" ,
                Rua = "rua do piramide",
                NumeroPorta = 1334,
                CodigoPostal = "1234-321",
                Cidade = "Braga",
                Pais = "Portugal",
                CoordenadaLon = 20,
                CoordenadaLat = 14,
                Altura = 100
            });

            testList.Add(new ArmazemDto(){
                Id="as2", 
                Designacao = "Armazem2" ,
                Rua = "rua do triangulo",
                NumeroPorta = 1334,
                CodigoPostal = "1234-421",
                Cidade = "Porto",
                Pais = "Portugal",
                CoordenadaLon = 30,
                CoordenadaLat = -12,
                Altura = 200
            });

            testList.Add(new ArmazemDto(){
                Id="as3", 
                Designacao = "Armazem3" ,
                Rua = "rua do quadrado",
                NumeroPorta = 134,
                CodigoPostal = "1734-421",
                Cidade = "Lisboa",
                Pais = "Portugal",
                CoordenadaLon = -30,
                CoordenadaLat = -42,
                Altura = 300
            });

            var armazemAtualizado= new ArmazemDto(){
                Id=testList[0].Id,
                Designacao= testList[0].Designacao, 
                Rua= "rua FELIZ",
                NumeroPorta= testList[0].NumeroPorta, 
                CodigoPostal= "1734-499",                
                Cidade= "Madrid",
                Pais= "Espanha",
                CoordenadaLon = -45,
                CoordenadaLat = 50,
                Altura = 400
            };
            
            var novoArmazem = new ArmazemDto(){
                Id="as9" ,
                Designacao = "Armazemteste" ,
                Rua = "rua do teste",
                NumeroPorta = 190,
                CodigoPostal = "1500-421",
                Cidade = "teste cidade",
                Pais = "teste pais",
                CoordenadaLon = 10,
                CoordenadaLat = -10,
                Altura = 500
            };

            var srv = new Mock<IArmazemService>();
            
            srv.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(testList));
            srv.Setup(x => x.GetByIdAsync(new ArmazemId(testList[0].Id))).Returns(Task.FromResult(testList[0]));

            srv.Setup(x => x.UpdateAsync(It.Is<ArmazemDto>(j => Guid.Equals(j.Id, testList[0].Id)))).Returns(Task.FromResult(armazemAtualizado));
            
            srv.Setup(x => x.AddAsync(It.Is<CreatingArmazemDto>(c => c.Designacao.Designacao.Equals("DESIGNACAOINVALIDA")))).Returns(Task.FromException<ArmazemDto>(new BusinessRuleValidationException("O texto fornecido não é valido.")));               
            srv.Setup(x => x.AddAsync(It.Is<CreatingArmazemDto>(c => !c.Designacao.Designacao.Equals("DESIGNACAOINVALIDA")))).Returns(Task.FromResult(novoArmazem));

            theMockedService = srv.Object;
        }

        [Fact]
        public async Task GetAllArmazensAsync_ShouldReturnAllArmazensAsync()
        {
            //Arrange
            var theController = new ArmazensController(theMockedService);

            //Act
            var result = await theController.GetAll();

            //Assert
            var tags = Assert.IsType<List<ArmazemDto>>(result.Value);
            Assert.Equal(3,tags.Count());
        }

        [Fact]
        public async Task GetArmazensAsync_ShouldReturnNotFound()
        {
            // Arrange      
            var theController = new ArmazensController(theMockedService);
            var testArmazemId = "as5";

            // Act
            var response = await theController.GetGetById(testArmazemId);

            //Assert       
            Assert.IsType<NotFoundResult>(response.Result);
        }

        [Fact]
        public async Task GetArmazemAsync_ShouldReturnTask()
        {
            // Arrange       
            var theController = new ArmazensController(theMockedService);
            var testTagId = testList[0].Id;

            // Act
            var result = await theController.GetGetById(testTagId);

            //Assert     
            Assert.IsType<ArmazemDto>(result.Value);
        }

        [Fact]
        public async Task GetArmazemAsync_ShouldReturnTheRigthTaskAsync()
        {
            // Arrange       
            var theController = new ArmazensController(theMockedService);
            var testArmazemId = testList[0].Id;

            // Act
            var result = await theController.GetGetById(testArmazemId);
            var arm=result.Value;

            //Assert     
            Assert.Equal(testArmazemId, (arm as ArmazemDto).Id);
        }

        [Fact]
        public async Task PutArmazemNaoExistente_ShouldReturnNotFound()
        {
            // Arrange     
            var theController = new ArmazensController(theMockedService);
            var testArmazemNaoExistenteId = "as5";

            var novaInfo = new ArmazemDto()
            {
                Id=testArmazemNaoExistenteId,
                Designacao = "Armazem5" ,
                Rua = "rua do piramide",
                NumeroPorta = 1334,
                CodigoPostal = "1234-321",
                Cidade = "Braga",
                Pais = "Portugal",
                CoordenadaLon = 20,
                CoordenadaLat = 14,
                Altura = 600
            };

            // Act
            var response = await theController.Update(testArmazemNaoExistenteId, novaInfo);

            //Assert       
            Assert.IsType<NotFoundResult>(response.Result);
        }

        [Fact]
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
        }

        [Fact]
        public async Task PutArmazemExistente_ShouldReturnArmazemDTO()
        {
            // Arrange     
            var theController = new ArmazensController(theMockedService);
            var testArmazemExistenteId = testList[0].Id;

            var novaInfo = new ArmazemDto()
            {
                Id=testArmazemExistenteId,
                Designacao = "Armazem5" ,
                Rua = "rua do piramide",
                NumeroPorta = 1334,
                CodigoPostal= "1734-499",                
                Cidade= "Madrid",
                Pais= "Espanha",
                CoordenadaLon = -45,
                CoordenadaLat = 50
            };

            // Act
            var response = (await theController.Update(testArmazemExistenteId, novaInfo));


            //Assert       
            Assert.IsType<ActionResult<ArmazemDto>>(response);
        }
        
        [Fact]
        public async Task PutArmazemExistente_ShouldReturnUpdatedInfo()
        {
            // Arrange     
            var theController = new ArmazensController(theMockedService);
            var testArmazemExistenteId = testList[0].Id;

            var novaInfo = new ArmazemDto()
            {
                Id = testArmazemExistenteId,
                Designacao = "Armazem1" ,
                Rua= "rua FELIZ",
                NumeroPorta = 1334,
                CodigoPostal = "1734-499",
                Cidade = "Madrid",
                Pais = "Espanha",
                CoordenadaLon = -45,
                CoordenadaLat = 50
            };

            // Act
            var response = (await theController.Update(testArmazemExistenteId, novaInfo)).Result;
            var result = (response as OkObjectResult).Value as ArmazemDto;

            //Assert     
//            Assert.Equal(novaInfo.Id,result.Id);
            Assert.Equal(novaInfo.Designacao,result.Designacao);
            Assert.Equal(novaInfo.Rua,result.Rua);
            Assert.Equal(novaInfo.NumeroPorta,result.NumeroPorta);
            Assert.Equal(novaInfo.CodigoPostal,result.CodigoPostal);
            Assert.Equal(novaInfo.Cidade,result.Cidade);
            Assert.Equal(novaInfo.Pais,result.Pais);
            Assert.Equal(novaInfo.CoordenadaLon,result.CoordenadaLon);
            Assert.Equal(novaInfo.CoordenadaLat,result.CoordenadaLat);
        }

        
        [Fact]
        public async Task PostArmazemComDesignacaolInvalidoAsync_ShouldReturnBadRequest()
        {
            // Arrange     
            var theController = new ArmazensController(theMockedService);

            var armazemComDesignacaoInvalida = new CreatingArmazemDto("as5",
                "DESIGNACAOINVALIDA" ,
                "rua do quadrado", 1234,"1224-321","Porto","Portugal",50,44,250
            );
            
            // Act
            Func<Task> result = async () => await theController.Create(armazemComDesignacaoInvalida);

            // Assert            
            await Assert.ThrowsAsync<BusinessRuleValidationException>(result);
        }

        [Fact]
        public async Task PostValidaArmazemAsync_ShouldReturnCreatedResponse()
        {
            // Arrange     
            var theController = new ArmazensController(theMockedService);
            var novoArmazem = new CreatingArmazemDto("as5","Armazem5" ,
                "rua do piramide", 1334,"1234-321","Braga","Portugal",20,14,250
            );
 
            // Act
            var response = await theController.Create(novoArmazem);

            // Assert
            Assert.IsType<CreatedAtActionResult>(response.Result);
        }        
    }
}
