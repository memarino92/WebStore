#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;
using WebStoreAPI;

namespace WebStoreAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly WebStoreContext _context;
        private readonly UserManager<User> _userManager;


        public OrdersController(WebStoreContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Orders
        [HttpGet(Name = "GetOrdersForUserAsync")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersForUserAsync()
        {
            var user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            var orders =  _context.Order.Where(order => order.UserId == user.Id);
            var ordersDTO = orders.Select(order => new OrderDTO
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                BookDTOs = order.Items.Select(o => new BookDTO
                {
                    BookId = o.Book.BookId,
                    Author = o.Book.Author,
                    Title = o.Book.Title,
                    ImageUrl = o.Book.ImageUrl,
                    Price = o.Book.GetPrice()
                }).ToList()
            });
            return Ok(ordersDTO);
        }
        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost(Name = "PlaceOrder")]
        public async Task<ActionResult<OrderDTO>> PlaceOrder()
        {
            var user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);
            if (user == null) return BadRequest();

            var cart = await _context.Cart.Where(cart => cart.UserId == user.Id && cart.IsActive == true).FirstOrDefaultAsync();
            if (cart == null) return BadRequest();

            var cartItems = await _context.CartItem.Where(item => item.CartId == cart.CartId).ToListAsync();
            if (cartItems == null) return BadRequest();

            var newOrder = new Order
            {
                CreatedAt = DateTime.Now,
                UserId = user.Id
            };

            _context.Order.Add(newOrder);
            await _context.SaveChangesAsync();

            foreach (var cartItem in cartItems)
            {
                var newOrderItem = new OrderItem { OrderId = newOrder.OrderId, BookId = cartItem.BookId };
                _context.OrderItem.Add(newOrderItem);
            }

            cart.IsActive = false;

            await _context.SaveChangesAsync();
           
            // Send email using SendGridAPI
            var apiKey = DotNetEnv.Env.GetString("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("no-reply@michaelmarino.dev", "Web Store");
            var subject = $"Web Store Order #{newOrder.OrderId}";
            var to = new EmailAddress(user.Email, user.UserName);
            var plainTextContent =
                $"Order Number: {newOrder.OrderId}";
            var htmlContent =
                $"<strong>Order Number: { newOrder.OrderId } </strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            var newOrderDTO = new OrderDTO { OrderId = newOrder.OrderId };

            return Ok(newOrderDTO);
        }
    }
}
