using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;



namespace WebStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly ILogger<UserController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public UserController(
            UserManager<User> userManager, 
            RoleManager<IdentityRole> roleManager,
            ILogger<UserController> logger, 
            WebStoreContext context
            )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet(Name = "getAllUsers")]
        public IEnumerable<User> Get()
        {
            var result = _userManager.Users.ToList();
            return result;
        }

        [HttpPost(Name = "createUser")]
        public async Task<User> CreateUser([FromBody]CreateUserDTO createUserDTO)
        {
            var user = new User { Email = createUserDTO.Email, UserName = createUserDTO.UserName };
            var result = await _userManager.CreateAsync(user, createUserDTO.Password);

            bool adminRoleExists = await _roleManager.RoleExistsAsync("admin");
            if (!adminRoleExists)
            {
                await _roleManager.CreateAsync(new IdentityRole("admin"));
            }
            var result2 = await _userManager.AddToRoleAsync(user, "admin");

            return user;
        }
    }
}
