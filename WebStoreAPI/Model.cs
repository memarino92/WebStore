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
            DbPath = "Server=localhost,1443;Database=WebStore;UserID=sa;Password=Pass@word1;";
        }
    }
}