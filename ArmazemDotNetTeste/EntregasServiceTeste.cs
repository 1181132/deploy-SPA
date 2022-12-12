using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using System.Linq;
using Moq;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;


namespace dotNetUnitTestes.Entregas
{
    [Collection("Sequential")]
    public class EntregasServiceTeste
    {
        IUnitOfWork theMockedUW;
        IEntregaRepository theMockedRepo;
        IArmazemRepository theMockedRepoArma;
        List<Entrega> testList;

        public EntregasServiceTeste()
        {
            testList = new List<Entrega>();
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var al1 = new ArmazemAltura(200);
            var a1 = new Armazem(i1,d1,e1,c1,al1);
            var ent1 = new Entrega("1","20-10-2000",10,a1.Id.AsString(),10, 15);
            testList.Add(ent1);   

            var i2 = new ArmazemId("as2");
            var d2 = new ArmazemDesignacao("Armazem1");
            var e2 = new ArmazemEndereco("rua do triangulo",1235,"1224-322","Coimbra","Portugal");
            var c2 = new ArmazemCoordenadas(-30,60);
            var al2 = new ArmazemAltura(300);
            var a2 = new Armazem(i2,d2,e2,c2,al2);
            var ent2 = new Entrega("2", "20-10-2000",15,a2.Id.AsString(),15, 20);
            testList.Add(ent2); 

            var i3 = new ArmazemId("as3");
            var d3 = new ArmazemDesignacao("Armazem3");
            var e3 = new ArmazemEndereco("rua do circulo",1236,"1224-323","Madrid","Espanha");
            var c3 = new ArmazemCoordenadas(22,-14);
            var al3 = new ArmazemAltura(400);
            var a3 = new Armazem(i3,d3,e3,c3,al3);
            var ent3 = new Entrega("3", "20-10-2000",20,a3.Id.AsString(), 20, 25);
            testList.Add(ent3); 
            
            var i4 = new ArmazemId("as4");
            var d4 = new ArmazemDesignacao("ArmazemTeste");
            var e4 = new ArmazemEndereco("rua do teste",1237,"1224-324","Paris","Franca");
            var c4 = new ArmazemCoordenadas(22,-14);
            var al4 = new ArmazemAltura(500);
            var novoArmazem = new Armazem(i4,d4,e4,c4,al4);
            var novaEntrega = new Entrega("4", "20-10-2000",10,novoArmazem.Id.AsString(), 25, 30);

            var srv = new Mock<IEntregaRepository>();
            
            srv.Setup(x => x.GetAllAsync()).Returns(Task.FromResult(testList));
            srv.Setup(x => x.GetByIdAsync(testList[0].Id)).Returns(Task.FromResult(testList[0]));

            // srv.Setup(x => x.UpdateAsync(It.Is<UpdatingJogadorDTO>(j => Guid.Equals(j.Id, testList[0].Id)))).Returns(Task.FromResult(jogadorAtualizado));
            
            srv.Setup(x => x.AddAsync(It.IsAny<Entrega>())).Returns(Task.FromResult(novaEntrega));

            theMockedRepo = srv.Object;
                        
            var uw = new Mock<IUnitOfWork>();

            uw.Setup(z => z.CommitAsync()).Returns(Task.FromResult(1));

            theMockedUW = uw.Object;
 
           
        }

        [Fact]
        public async Task GetAllEntregasFromReposAsync_ShouldReturnAllEntregasAsync()
        {
            //Arrange
            var theService = new EntregaService(theMockedUW, theMockedRepo, theMockedRepoArma);

            //Act
            var result = await theService.GetAllAsync();

            //Assert
            var entregas = Assert.IsType<List<EntregaDto>>(result);
            Assert.Equal(3,entregas.Count());
        }

        [Fact]
        public async Task GetEntregasFromRepoAsync_ShouldReturnNull()
        {
            // Arrange      
            var theService = new EntregaService(theMockedUW, theMockedRepo,theMockedRepoArma);
            var testEntregaId = "5";

            // Act
            var response = await theService.GetByIdAsync(new EntregaId(testEntregaId));

            //Assert       
            Assert.Null(response);
        }

        [Fact]
        public async Task GetEntregaFromRepoAsync_ShouldReturnTask()
        {
            // Arrange      
            var theService = new EntregaService(theMockedUW, theMockedRepo, theMockedRepoArma);
            var testId = testList[0].Id;

            // Act
            var result = await theService.GetByIdAsync(testId);

            //Assert     
            Assert.IsType<EntregaDto>(result);
        }

        [Fact]
        public async Task GetEntregaFromRepoAsync_ShouldReturnTheRigthOneAsync()
        {
            // Arrange       
            var theService = new EntregaService(theMockedUW, theMockedRepo, theMockedRepoArma);
            var testId = testList[0].Id;

            // Act
            var entrega = await theService.GetByIdAsync(testId);

            //Assert     
            Assert.Equal(testId.AsString(), entrega.Id);
        }

        
    /*     [Fact]
        public async Task PutEntregaNaoExistenteInRepo_ShouldReturnNull()
        {
            // Arrange     
            var theService = new EntregaService(theMockedUW, theMockedRepo, theMockedRepoArma);
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var al1 = new ArmazemAltura(200);
            var a1 = new Armazem(i1,d1,e1,c1,al1);

            var novaInfo = new EntregaDto()
            {
                Id="6",
                Data = "20-10-2000",
                Massa = 10,
                ArmazemId = a1.Id.AsString(),
                TempoColocarEntrega= 10,
                TempoRetirarEntrega = 15
            };

            // Act
            var response = await theService.UpdateAsync(novaInfo);

            //Assert       
            Assert.Null(response);
        }
 */
     /*           [Fact]
        public async Task PutEntregaEmArmazemNaoExistenteInRepo_ShouldReturnNull()
        {
            // Arrange     
            var theService = new EntregaService(theMockedUW, theMockedRepo);
            var i1 = new ArmazemId("123");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var novaInfo = new EntregaDto()
            {
                Id="1",
                Data = "20-10-2000",
                Massa = 10,
                ArmazemId = new ArmazemId("123") , //nao sei se é assim
                TempoColocarEntrega= 10,
                TempoRetirarEntrega = 15
            };

            // Act
            var response = await theService.UpdateAsync(novaInfo);

            //Assert       
            Assert.Null(response);
        }*/
        

     /*   [Fact]
        public async Task PostEntregaComDataInvalidaInRepoAsync_ShouldReturnBadRequest()
        {
            // Arrange     
            var theService = new EntregaService(theMockedUW, theMockedRepo);
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var a1 = new Armazem(i1,d1,e1,c1);

            var entregaComDataInvalida = new CreatingEntregaDto("20","20092022" ,10,a1.Id,10,15);

            // Act
            Func<Task> result = async () => await theService.AddAsync(entregaComDataInvalida);

            // Assert            
            await Assert.ThrowsAsync<BusinessRuleValidationException>(result);
        }*/

       /*  [Fact]
        public async Task PostValidEntregaInRepoAsync_ShouldReturnEntregaDTO()
        {
            // Arrange     
            var theService = new EntregaService(theMockedUW, theMockedRepo, theMockedRepoArma);
            var i1 = new ArmazemId("as1");
            var d1 = new ArmazemDesignacao("Armazem1");
            var e1 = new ArmazemEndereco("rua do quadrado",1234,"1224-321","Porto","Portugal");
            var c1 = new ArmazemCoordenadas(50,44);
            var al1 = new ArmazemAltura(200);
            var a1 = new Armazem(i1,d1,e1,c1,al1);

            var novoEntrega = new CreatingEntregaDto("77","20-10-2022",10,a1.Id.AsString(),20,25);
 
            // Act
            var response = await theService.AddAsync(novoEntrega);

            // Assert
            Assert.IsType<EntregaDto>(response);
        }  */
    }
}