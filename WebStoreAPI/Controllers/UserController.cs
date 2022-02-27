using Microsoft.AspNetCore.Mvc;


namespace WebStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public UserController(ILogger<UserController> logger, WebStoreContext context)
        {
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet(Name = "getAllUsers")]
        public IEnumerable<User> Get()
        {
            var result = _webStoreContext.User.ToList();
            return result;
        }
    }
}
