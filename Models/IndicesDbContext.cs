using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace hr_rooster.Models
{
  public class IndicesDbContext : DbContext
  {
    public IndicesDbContext(DbContextOptions<IndicesDbContext> options)
      : base(options)
    {}

    public DbSet<Classes> Classes { get; set; }
    public DbSet<Teachers> Teachers { get; set; }
    public DbSet<Rooms> Rooms { get; set; }
    public DbSet<Institutes> Institutes { get; set; }
  }
}