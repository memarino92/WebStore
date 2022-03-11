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
        public IEnumerable<AdminUserDTO> Get()
        {
            var result = _userManager.Users.ToList().Select(user => new AdminUserDTO
            {
                UserName = user.UserName,
                Email = user.Email,
            });
            return result;
        }

        [HttpPost(Name = "createUser")]
        public async Task<User> CreateUser([FromBody]CreateUserDTO createUserDTO)
        {
            var user = new User { Email = createUserDTO.Email, UserName = createUserDTO.UserName };
            var result = await _userManager.CreateAsync(user, createUserDTO.Password);
            
            return user;
        }

        [HttpPut(Name = "updateUserPassword")]
        public async Task<AdminUserDTO> UpdateUserPassword([FromBody] UpdateUserPasswordDTO updateUserPasswordDTO)
        {
            var user = await _userManager.FindByNameAsync(updateUserPasswordDTO.UserName);

            await _userManager.RemovePasswordAsync(user);
            await _userManager.AddPasswordAsync(user, updateUserPasswordDTO.Password);

            var responseAdminUserDTO = new AdminUserDTO
            {
                Email = user?.Email,
                UserName = user?.UserName,
            };

            return responseAdminUserDTO;
        }
    }
}
