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
    [Route("api/[controller]")]
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Order.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> PostOrder()
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

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.OrderId == id);
        }
    }
}
