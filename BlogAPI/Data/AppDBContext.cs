using BlogAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Reflection;

namespace BlogAPI.Data
{
    public class AppDBContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDBContext(IConfiguration configuration) : base()
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Configuration.GetConnectionString("Database"));

        }
        public DbSet<User> Users { get; set; }
        public DbSet<BlogModel> Blogs { get; set; }
        public DbSet<Comment> Comments { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
            AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Comment>()
          .HasOne(e => e.ParentComment)           
          .WithMany(e => e.Comments)       
          .HasForeignKey(e => e.ParentCommentId)     
          .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>().HasData(
            new User()
            {
                Id = 1,
                UserName = "John Doe",
                Password = "Password",
                Email = "Half@email.com"
            }
            );
            modelBuilder.Entity<BlogModel>().HasData(
            new BlogModel()
            {
                Id = 1,
                Title = "First Blog",
                Content = "This is my first blog",
                
                

            }
            );


        }
    }

}
