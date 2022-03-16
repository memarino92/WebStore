using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WebStoreAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer",Roles ="admin")]
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
            var result = _userManager.Users.ToList().OrderBy( user => user.UserName).Select(user => new AdminUserDTO
            {
                UserName = user.UserName,
                Email = user.Email,
            });
            return result;
        }

        [HttpPost(Name = "createUser")]
        public async Task<User> CreateUser([FromBody] CreateUserDTO createUserDTO)
        {
            var user = new User { Email = createUserDTO.Email, UserName = createUserDTO.UserName };
            await _userManager.CreateAsync(user, createUserDTO.Password);

            if (createUserDTO.IsAdmin)
            {
                bool adminRoleExists = await _roleManager.RoleExistsAsync("admin");
                if (!adminRoleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole("admin"));
                }
                await _userManager.AddToRoleAsync(user, "admin");
            }


            Claim userClaim = new Claim("name", createUserDTO.UserName);
            await _userManager.AddClaimAsync(user, userClaim);

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
