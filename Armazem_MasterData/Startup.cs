using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;
using DDDSample1.Infrastructure.Armazens;
using DDDSample1.Infrastructure.Entregas;


namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

services.AddCors(options =>

{

options.AddPolicy(

name: "AllowOrigin",

builder => {

builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

});

});

services.AddControllers().AddNewtonsoftJson();

            services
                .AddDbContext<DDDSample1DbContext>(options =>
                    options
                        .UseMySql(Configuration
                                .GetConnectionString("OtherConnection"),
                            new MariaDbServerVersion(new Version(10, 7, 3)),
                            o => o.SchemaBehavior(MySqlSchemaBehavior.Ignore))
                        .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            var optionsBuilder = new DbContextOptionsBuilder<DDDSample1DbContext>();

          /*  optionsBuilder.UseMySql(Configuration.GetConnectionString("OtherConnection"),
                new MariaDbServerVersion(new Version(10, 7, 3)), o => o.SchemaBehavior(MySqlSchemaBehavior.Ignore));

            using (var dbContext = new DDDSample1DbContext(optionsBuilder.Options))
            {
                dbContext.Database.EnsureCreated();
            }*/
            services.AddControllers();

            ConfigureMyServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseCors("AllowOrigin");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app
                .UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<IArmazemRepository, ArmazemRepository>();
            services.AddTransient<IArmazemService, ArmazemService>();

            services.AddTransient<IEntregaRepository, EntregaRepository>();
            services.AddTransient<IEntregaService, EntregaService>();
        }
    }
}