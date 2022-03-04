using Microsoft.AspNetCore.Identity;

namespace WebStoreAPI
{
    public class User : IdentityUser
    {
        public List<Cart> Carts { get; set; }
    }

    public class CreateUserDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
