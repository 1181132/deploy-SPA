using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using System.Linq;
using Moq;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;


namespace dotNetUnitTestes.Armazens
{
    [Collection("Sequential")]
    public class ArmazensServiceTeste
    {
        IUnitOfWork theMockedUW;
        IArmazemRepository theMockedRepo;
        List<Armazem> testList;

        public ArmazensServiceTeste()
        {
            testList = new List<Armazem>();
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);
            testList.Add(a1);   

            var i2 = new ArmazemId("as2");
            var d2 = new ArmazemDesignacao("Armazem1");
            var e2 = new ArmazemEndereco("rua do triangulo",1235,"1224-322","Coimbra","Portugal");
            var c2 = new ArmazemCoordenadas(-30,60);
            var a2 = new Armazem(i2,d2,e2,c2);
            testList.Add(a2); 

            var i3 = new ArmazemId("as3");
            var d3 = new ArmazemDesignacao("Armazem3");
            var e3 = new ArmazemEndereco("rua do circulo",1236,"1224-323","Madrid","Espanha");
            var c3 = new ArmazemCoordenadas(22,-14);
            var a3 = new Armazem(i3,d3,e3,c3);
            testList.Add(a3); 
            
            var i4 = new ArmazemId("as4");
            var d4 = new ArmazemDesignacao("ArmazemTeste");
            var e4 = new ArmazemEndereco("rua do teste",1237,"1224-324","Paris","Franca");
            var c4 = new ArmazemCoordenadas(22,-14);
            var novoArmazem = new Armazem(i4,d4,e4,c4);
            var srv = new Mock<IArmazemRepository>();
            
            srv.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(testList));
            srv.Setup(x => x.GetByIdAsync(testList[0].Id)).Returns(Task.FromResult(testList[0]));

            // srv.Setup(x => x.UpdateAsync(It.Is<UpdatingJogadorDTO>(j => Guid.Equals(j.Id, testList[0].Id)))).Returns(Task.FromResult(jogadorAtualizado));
            
            srv.Setup(x => x.AddAsync(It.IsAny<Armazem>())).Returns(Task.FromResult(novoArmazem));

            theMockedRepo = srv.Object;
                        
            var uw = new Mock<IUnitOfWork>();

            uw.Setup(z => z.CommitAsync()).Returns(Task.FromResult(1));

            theMockedUW = uw.Object;
 
           
        }

        [Fact]
        public async Task GetAllArmazensFromReposAsync_ShouldReturnAllArmazensAsync()
        {
            //Arrange
            var theService = new ArmazemService(theMockedUW, theMockedRepo);

            //Act
            var result = await theService.GetAllAsync();

            //Assert
            var armazens = Assert.IsType<List<ArmazemDto>>(result);
            Assert.Equal(3,armazens.Count());
        }

        [Fact]
        public async Task GetArmazensFromRepoAsync_ShouldReturnNull()
        {
            // Arrange      
            var theService = new ArmazemService(theMockedUW, theMockedRepo);
            var testArmazemId = "ax5";

            // Act
            var response = await theService.GetByIdAsync(new ArmazemId(testArmazemId));

            //Assert       
            Assert.Null(response);
        }

        [Fact]
        public async Task GetArmazemFromRepoAsync_ShouldReturnTask()
        {
            // Arrange      
            var theService = new ArmazemService(theMockedUW, theMockedRepo);
            var testId = testList[0].Id;

            // Act
            var result = await theService.GetByIdAsync(testId);

            //Assert     
            Assert.IsType<ArmazemDto>(result);
        }

        [Fact]
        public async Task GetArmazemFromRepoAsync_ShouldReturnTheRigthOneAsync()
        {
            // Arrange       
            var theService = new ArmazemService(theMockedUW, theMockedRepo);
            var testId = testList[0].Id;

            // Act
            var arm = await theService.GetByIdAsync(testId);

            //Assert     
            Assert.Equal(testId.AsString(), arm.Id);
        }

        
        [Fact]
        public async Task PutArmazemNaoExistenteInRepo_ShouldReturnNull()
        {
            // Arrange     
            var theService = new ArmazemService(theMockedUW, theMockedRepo);
            var novaInfo = new ArmazemDto()
            {
                Id="ac6",
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
            var response = await theService.UpdateAsync(novaInfo);

            //Assert       
            Assert.Null(response);
        }

        [Fact]
        public async Task PutJogadorExistenteInRepo_ShouldReturnJogadorDTO()
        {
            // Arrange     
            var theService = new ArmazemService(theMockedUW, theMockedRepo);
            var testArmazemExistenteId = testList[0].Id;

            var novaInfo = new ArmazemDto()
            {
                Id = testArmazemExistenteId.AsString(),
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
            var response = (await theService.UpdateAsync(novaInfo));   
            
            //Assert       
            Assert.IsType<ArmazemDto>(response);
        }
        
        [Fact]
        public async Task PutArmazemExistenteInRepo_ShouldReturnUpdatedInfo()
        {
            // Arrange     
            var theService = new ArmazemService(theMockedUW, theMockedRepo);
            var testArmazemExistenteId = testList[0].Id;

            var novaInfo = new ArmazemDto()
            {
                Id = testArmazemExistenteId.AsString(),
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
            var result = (await theService.UpdateAsync(novaInfo));  

            //Assert     
            Assert.Equal(novaInfo.Id,result.Id);
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
        public async Task PostArmazemComDesignacaolInvalidaInRepoAsync_ShouldReturnBadRequest()
        {
            // Arrange     
            var theService = new ArmazemService(theMockedUW, theMockedRepo);

            var armazemComDesignacaoInvalida = new CreatingArmazemDto("qwe","" ,
                "rua do quadrado", 1234,"1224-321","Porto","Portugal",50,44);

            // Act
            Func<Task> result = async () => await theService.AddAsync(armazemComDesignacaoInvalida);

            // Assert            
            await Assert.ThrowsAsync<BusinessRuleValidationException>(result);
        }

        [Fact]
        public async Task PostValidJogadorInRepoAsync_ShouldReturnJogadorDTO()
        {
            // Arrange     
            var theService = new ArmazemService(theMockedUW, theMockedRepo);
            var novoArmazem = new CreatingArmazemDto("gfd","Armazem5" ,
                "rua do piramide", 1334,"1234-321","Braga","Portugal",20,14);
 
            // Act
            var response = await theService.AddAsync(novoArmazem);

            // Assert
            Assert.IsType<ArmazemDto>(response);
        }        
    }
}
