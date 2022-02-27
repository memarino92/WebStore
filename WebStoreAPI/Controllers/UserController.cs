using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;



namespace WebStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly ILogger<UserController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public UserController(UserManager<User> userManager, ILogger<UserController> logger, WebStoreContext context)
        {
            _userManager = userManager;
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet(Name = "getAllUsers")]
        public IEnumerable<User> Get()
        {
            var result = _webStoreContext.User.ToList();
            return result;
        }

        [HttpPost(Name = "createUser")]
        public async Task<User> CreateUser()
        {
            var user = new User { Email = "test@email.com", UserName = "testuser" };
            var result = await _userManager.CreateAsync(user, @"T3st!P@ssword");
            
            return user;
        }
    }
}
