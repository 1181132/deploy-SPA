using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class NomeDaMigracao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Armazens",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Designacao_Designacao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_Rua = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_NumeroPorta = table.Column<int>(type: "int", nullable: true),
                    Endereco_CodigoPostal = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_Cidade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Endereco_Pais = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Coordenadas_CoordenadaLon = table.Column<int>(type: "int", nullable: true),
                    Coordenadas_CoordenadaLat = table.Column<int>(type: "int", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Armazens", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Entregas",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    dataEntrega = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    massaEntrega = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    armazemEntrega = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tempoColocarEntrega = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    tempoRetirarEntrega = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entregas", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Armazens");

            migrationBuilder.DropTable(
                name: "Entregas");
        }
    }
}
