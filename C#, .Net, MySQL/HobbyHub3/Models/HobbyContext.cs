using System;
using Microsoft.EntityFrameworkCore;

namespace HobbyHub3.Models
{
    public class HobbiesContext : DbContext
    {
        public HobbiesContext(DbContextOptions<HobbiesContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Hobby> Hobbies { get; set; }
        public DbSet<HobbyJoined> HobbiesJoined { get; set; }
    }
}
