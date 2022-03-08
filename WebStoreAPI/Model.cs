using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebStoreAPI;

namespace WebStoreAPI
{
    public class WebStoreContext : IdentityDbContext<User>
    {
        public DbSet<Book> Book { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<CartItem> CartItem { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderItem> OrderItem { get; set; }


        public string DbPath { get; }

        public WebStoreContext(DbContextOptions<WebStoreContext> options)
            : base(options)
        {
            DbPath = ***REMOVED***;
        }

    }
}