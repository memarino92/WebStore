using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {

        private readonly ILogger<BookController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public BookController(ILogger<BookController> logger, WebStoreContext context)
        {
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet(Name = "Books")]
        public  IEnumerable<BookDTO> Get()
        {
            var result =  _webStoreContext.Book.ToList().Select(book => new BookDTO
            {
                Author = book.Author,
                Title = book.Title,
                BookId = book.BookId,
                ImageUrl = book.ImageUrl,
                Price = book.Cost * (1 + book.Markup / 100)
            });
            return result;
        }

        [HttpPost(Name = "CreateBook")]
        public Book CreateBook([FromBody] CreateBookDTO book)
        {
            var newBook = new Book
            {
                Author = book.Author,
                CreatedAt = DateTime.Now,
                Title = book.Title,
                Cost = book.Cost,
                Markup = book.Markup,
                ImageUrl = book.ImageUrl,
                Category = book.Category
            };
            
            _webStoreContext.Book.Add(newBook);
            _webStoreContext.SaveChanges();
            return newBook;
        }

        [HttpGet("/GetBooksForAdmin")]
        public IEnumerable<CreateBookDTO> GetBooksForAdmin()
        {
            var result = _webStoreContext.Book.ToList().Select(book => new CreateBookDTO
            {
                Author = book.Author,
                Title = book.Title,
                BookId = book.BookId,
                ImageUrl = book.ImageUrl,
                Cost = book.Cost,
                Markup= book.Markup,
                Category = book.Category
            });
            return result;
        }

        [HttpDelete(Name ="DeleteBook")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _webStoreContext.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _webStoreContext.Book.Remove(book);
            await _webStoreContext.SaveChangesAsync();

            return NoContent();
        }
    }
}