using Microsoft.AspNetCore.Identity;

namespace WebStoreAPI
{
    public class User : IdentityUser
    {
        public List<Cart> Carts { get; set; }
        public List<Order> Orders { get; set; }
    }

    public class CreateUserDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class AdminUserDTO
    {
        public string UserName { get; set;}
        public string Email { get; set;}
    }

    public class UpdateUserPasswordDTO
    {
        public string UserName { get; set;}
        public string Password { get; set; }
    }
    public class RolesDTO
    {
        public List<string> Roles { get; set; }
    }
}
