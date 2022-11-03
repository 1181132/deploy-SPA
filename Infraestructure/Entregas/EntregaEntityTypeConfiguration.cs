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
            builder.HasKey(b => b.Id);
            /*builder.OwnsOne(b => b.Data);
            builder.OwnsOne(b => b.Massa);
            builder.OwnsOne(b => b.ArmazemId);
            builder.OwnsOne(b => b.TempoColocar);
            builder.OwnsOne(b => b.TempoRetirar);*/
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}