using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WebStoreAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer",Roles ="admin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
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
        [HttpGet(Name = "GetAllUsers")]
        public async Task<ActionResult<IEnumerable<AdminUserDTO>>> Get()
        {
            try
            {
                var result = _webStoreContext.Users.OrderBy(user => user.UserName).Select(user => new AdminUserDTO
                {
                    UserName = user.UserName,
                    Email = user.Email,
                }).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }

        [HttpPost(Name = "CreateUser")]
        public async Task<ActionResult<CreateUserDTO>> CreateUser([FromBody] CreateUserDTO createUserDTO)
        {
            try
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

                

                return Ok(createUserDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPut(Name = "UpdateUserPassword")]
        public async Task<ActionResult<AdminUserDTO>> UpdateUserPassword([FromBody] UpdateUserPasswordDTO updateUserPasswordDTO)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(updateUserPasswordDTO.UserName);

                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, updateUserPasswordDTO.Password);

                var responseAdminUserDTO = new AdminUserDTO
                {
                    Email = user?.Email,
                    UserName = user?.UserName,
                };

                return Ok(responseAdminUserDTO);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }
    }
}
