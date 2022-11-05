
Projeto exemplo/template em ASP.NET Core 5.0 API para demonstrar como usar/aplicar (alguns conceitos de) DDD nesta tecnologia e usando também Entity Framework.
Adota um estilo arquitetural Onion.

Este exemplo compreende:
- um dominio com 3 aggregate roots (Category, Product e Family);
- um relacionamento de N <— 1 entre Category e Product;
- clara separação entre (i) API REST, (ii) Domínio e (iii) Infraestrutura (Persistência);
- aplicação de algumas regras de negócio/validação.

O dominio contempla as Entidade do negócio, os Serviços (ou casos de uso) envolvendo essas entidades e DTOs (in/out para os serviços de dominio).
Por simplicidade, empacotei fisicamente (packages) estas coisas por agregado.
Como é óbvio, outras alternativas de empacotamento são aceitáveis e (se calhar) desejáveis.

Também reconheço que podem ser introduzidas algumas melhorias interessantes com relativamente pouco esforço (mas de momento não tenho tempo).


Ficheiro appsettings.json -> "DefaultConnection": "server=sql.freesqldatabase.com;user=root;port:3306;password=6fBRs/RwFlwQ;database=WMbase",

Ficheiro DDDNetCore.csproj -> 
 <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Cors" Version="2.1.1" />   
    <PackageReference Include="Microsoft.AspNetCore.Mvc.NewtonsoftJson" Version="5.0.11" />
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="5.0.11" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="5.0.11">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="5.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Relational.Design" Version="1.1.6" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="5.0.11" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="5.0.11" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="5.0.11">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="5.0.2" />
    <PackageReference Include="Newtonsoft.Json" Version="12.0.3" />
        <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="6.0.10">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
  </ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="6.0.10">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>