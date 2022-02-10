using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebStoreAPI
{
    public class WebStoreContext : DbContext
    {
        public DbSet<Book> Book { get; set; }

        public string DbPath { get; }

        public WebStoreContext(DbContextOptions<WebStoreContext> options)
            : base(options)
        {
            DbPath = "Server=localhost,1443;Database=WebStore;UserID=sa;Password=Pass@word1;";
        }
    }
}