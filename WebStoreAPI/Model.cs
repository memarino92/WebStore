using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebStoreAPI
{
    public class WebStoreContext : IdentityDbContext<User>
    {
        public DbSet<Book> Book { get; set; }
        public DbSet<User> User { get; set; }

        public string DbPath { get; }

        public WebStoreContext(DbContextOptions<WebStoreContext> options)
            : base(options)
        {
            DbPath = "Data Source=localhost;Initial Catalog=master;User ID=sa;Password=Pass@word1";
        }
    }
}