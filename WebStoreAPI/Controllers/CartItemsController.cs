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

namespace WebStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly WebStoreContext _context;

        public CartItemsController(WebStoreContext context)
        {
            _context = context;
        }

        // GET: api/CartItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetCartItem()
        {
            var cartItems = _context.CartItem.ToList();
            List<int> bookIds = cartItems.Select(cartItem => cartItem.BookId).ToList();
            var books = await _context.Book.Where(book => bookIds.Contains(book.BookId)).ToListAsync();
            var actualBooks = bookIds.Select(bookId => books.Find(book => book.BookId == bookId));
            var response = actualBooks.Select(book => new BookDTO { BookId = book.BookId,Title = book.Title, Author = book.Author, ImageUrl = book.ImageUrl, Price = book.Price});

            return Ok(response);
        }

        // GET: api/CartItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(string id)
        {
            var cartItem = await _context.CartItem.FindAsync(id);

            if (cartItem == null)
            {
                return NotFound();
            }

            return cartItem;
        }

        // PUT: api/CartItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartItem(string id, CartItem cartItem)
        {
            if (id != cartItem.CartItemId)
            {
                return BadRequest();
            }

            _context.Entry(cartItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartItemExists(id))
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

        // POST: api/CartItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(CreateCartItemDTO cartItem)
        {
            var newCartItem = new CartItem
            {
                CartItemId = Guid.NewGuid().ToString(),
                CreatedAt = DateTime.Now,
                BookId = cartItem.BookId, 
                CartId = cartItem.CartId
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

            return CreatedAtAction("GetCartItem", newCartItem);
        }

        // DELETE: api/CartItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(string id)
        {
            var cartItem = await _context.CartItem.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItem.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartItemExists(string id)
        {
            return _context.CartItem.Any(e => e.CartItemId == id);
        }
    }
}
