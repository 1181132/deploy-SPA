using System.Net;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Armazens;
using DDDSample1.Infrastructure.Entregas;
using DDDSample1.Infrastructure.Shared;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

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
            // IWebHostEnvironment (stored in _env) is injected into the Startup class.
           // if (!_env.IsDevelopment())
          //  {
                services
                    .AddHttpsRedirection(options =>
                    {
                        options.RedirectStatusCode =
                            (int) HttpStatusCode.PermanentRedirect;
                        options.HttpsPort = 443;
                    });
          //  }

            services.AddControllers().AddNewtonsoftJson();

            // var connection= "Data Source= theDataBase.db";
            //   services.AddDbContext<DDDSample1DbContext>(options=> options.UseSqlite(connection));
            services
                .AddDbContext<DDDSample1DbContext>(options =>
                    options
                        .UseSqlServer(Configuration
                            .GetConnectionString("DefaultConnection"))
                        .ReplaceService
                        <IValueConverterSelector,
                            StronglyEntityIdValueConverterSelector
                        >());

            services
                .AddCors(options =>
                {
                    options
                        .AddPolicy("AllowAll",
                        builder =>
                        {
                            builder
                                .AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                        });
                });

            ConfigureMyServices (services);

            /*services.AddDbContext<DDDSample1DbContext>(opt =>
                opt.UseInMemoryDatabase("DDDSample1DB")
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>())

            */
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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
                .UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<IArmazemRepository, ArmazemRepository>();
            services.AddTransient<ArmazemService>();

            services.AddTransient<IEntregaRepository, EntregaRepository>();
            services.AddTransient<EntregaService>();
        }
    }
}
