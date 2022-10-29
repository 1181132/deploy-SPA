using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Families;
using DDDSample1.Infrastructure.Armazens;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {
        public DbSet<Armazem> Armazens { get; set; }

        public DbSet<Family> Families { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ArmazemEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
        }
    }
}