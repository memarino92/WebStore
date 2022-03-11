using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

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

        [Authorize(AuthenticationSchemes = "Bearer")]
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

            bool adminRoleExists = await _roleManager.RoleExistsAsync("admin");
            if (!adminRoleExists)
            {
                await _roleManager.CreateAsync(new IdentityRole("admin"));
            }
            var result2 = await _userManager.AddToRoleAsync(user, "admin");

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

        [HttpGet("/getRolesForUserAsync")]
        public async Task<RolesDTO> GetRolesForUserAsync(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var roles = await _userManager.GetRolesAsync(user);

            var rolesDTO = new RolesDTO
            {
                Roles = (List<string>)roles
            };

            return rolesDTO;
        }
    }
}
