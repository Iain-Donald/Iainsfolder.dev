using System;
using Microsoft.EntityFrameworkCore;

//namespace LogAndReg3.Models
//{
    public class MyContext : DbContext 
    { 
        public MyContext(DbContextOptions options) : base(options) { }
        // the "Monsters" table name will come from the DbSet variable name
        public DbSet<User> users { get; set; }
    }
//}
