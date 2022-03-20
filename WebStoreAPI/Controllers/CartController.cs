#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebStoreAPI;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace WebStoreAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ILogger<CartController> _logger;
        private readonly WebStoreContext _context;
        private readonly UserManager<User> _userManager;

        public CartController(ILogger<CartController> logger, WebStoreContext context, UserManager<User> userManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;

        }

        // GET: api/CartItems
        [HttpGet(Name = "GetCartItemsForUser")]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetCartItemsForUser()
        {
            try
            {
                var user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);
                if (user == null)
                { return BadRequest(); }

                var cart = await _context.Cart.Where(cart => cart.UserId == user.Id && cart.IsActive == true).FirstOrDefaultAsync();
                if (cart == null)
                {
                    var newCart = new Cart
                    {
                        UserId = user.Id,
                        CreatedAt = DateTime.Now,
                        IsActive = true
                    };
                    _context.Cart.Add(newCart);
                    await _context.SaveChangesAsync();
                    cart = newCart;
                }

                var cartItems = await _context.CartItem.Where(item => item.CartId == cart.CartId).ToListAsync();
                List<int> bookIds = cartItems.Select(cartItem => cartItem.BookId).ToList();
                var books = await _context.Book.Where(book => bookIds.Contains(book.BookId)).ToListAsync();
                var actualBooks = bookIds.Select(bookId => books.Find(book => book.BookId == bookId));
                var response = actualBooks.Select(book => new BookDTO { BookId = book.BookId, Title = book.Title, Author = book.Author, ImageUrl = book.ImageUrl, Price = book.GetPrice() });

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }

        // POST: api/CartItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost(Name = "AddItemToCart")]
        public async Task<ActionResult<List<BookDTO>>> AddItemToCart(CreateCartItemDTO cartItem)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(HttpContext.User.Identity.Name);
                if (user == null)
                { return BadRequest(); }

                var cart = await _context.Cart.Where(cart => cart.UserId == user.Id && cart.IsActive == true).FirstOrDefaultAsync();
                if (cart == null)
                {
                    var newCart = new Cart
                    {
                        UserId = user.Id,
                        CreatedAt = DateTime.Now,
                        IsActive = true
                    };
                    _context.Cart.Add(newCart);
                    await _context.SaveChangesAsync();
                    cart = newCart;
                }

                var newCartItem = new CartItem
                {
                    CartItemId = Guid.NewGuid().ToString(),
                    CreatedAt = DateTime.Now,
                    BookId = cartItem.BookId,
                    CartId = cart.CartId
                };
                _context.CartItem.Add(newCartItem);
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateException)
                {
                    throw;
                }
                var book = await _context.Book.FindAsync(cartItem.BookId);
                var bookAddedToCart = new BookDTO { BookId = book.BookId, Title = book.Title, Author = book.Author, ImageUrl = book.ImageUrl, Price = book.GetPrice() };

                var cartItems = _context.CartItem.Where(cartItem => cartItem.CartId == cart.CartId)
                    .Select(cartItem => new BookDTO
                    {
                        BookId = cartItem.BookId,
                        Title = cartItem.Book.Title,
                        Author = cartItem.Book.Author,
                        ImageUrl = cartItem.Book.ImageUrl,
                        Price = cartItem.Book.Cost * (1 + cartItem.Book.Markup / 100)
                    }).ToList();

                return Ok(cartItems);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }
    }
}
