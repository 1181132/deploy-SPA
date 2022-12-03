using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Entregas;

namespace DDDSample1.Infrastructure.Entregas
{
    internal class EntregaEntityTypeConfiguration : IEntityTypeConfiguration<Entrega>
    {
        public void Configure(EntityTypeBuilder<Entrega> builder)
        {
            //builder.ToTable("Entregas", SchemaNames.DDDSample1);
            //builder.ToTable("Entregas", SchemaNames.DDDSample1);
                builder.HasKey(b => b.Id);
                //builder.OwnsOne(b => b.EntregaData, EntregaData => { EntregaData.Property("data").IsRequired();});
                //builder.OwnsOne(b => b.EntregaMassa, EntregaMassa => { EntregaMassa.Property("massa").IsRequired();});
                builder.OwnsOne(b => b.Data);
                builder.OwnsOne(b => b.Massa);
                builder.HasOne(e => e.Armazem).WithMany(p => p.entregas).HasForeignKey(b => b.ArmazemId);
                builder.OwnsOne(b => b.TempoColocarEntrega);
                builder.OwnsOne(b => b.TempoRetirarEntrega);
                //builder.OwnsOne(b => b.EntregaTempoColocar, EntregaTempoColocar => { EntregaTempoColocar.Property("tempoColocacao").IsRequired();});
                //builder.OwnsOne(b => b.EntregaTempoRetirar, EntregaTempoRetirar => { EntregaTempoRetirar.Property("tempoColocacao").IsRequired();});
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}