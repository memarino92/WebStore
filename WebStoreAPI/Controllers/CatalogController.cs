using Microsoft.AspNetCore.Mvc;

namespace WebStoreAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {

        private readonly ILogger<CatalogController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public CatalogController(ILogger<CatalogController> logger, WebStoreContext context)
        {
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet(Name = "GetAllBooks")]
        public  IEnumerable<BookDTO> Get()
        {
            var result =  _webStoreContext.Book.ToList().Select(book => new BookDTO
            {
                Author = book.Author,
                Title = book.Title,
                BookId = book.BookId,
                ImageUrl = book.ImageUrl,
                Price = book.GetPrice(),
            });
            return result;
        }

        [HttpPost(Name = "CreateBook")]
        public async Task<CreateBookDTO> CreateBook([FromBody] CreateBookDTO book)
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
            var bookToReturn = book;
            bookToReturn.BookId = newBook.BookId;
            return bookToReturn;
        }

        [HttpGet(Name = "GetBooksForAdmin")]
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

        [HttpDelete(Name = "DeleteBook")]
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

        [HttpGet("{category}", Name = "GetBooksByCategory")]
        public IEnumerable<BookDTO> GetBooksByCategory(string category)
        {
            var result = _webStoreContext.Book.Where(x => x.Category == category).Select(book => new BookDTO
            {
                Author = book.Author,
                Title = book.Title,
                BookId = book.BookId,
                ImageUrl = book.ImageUrl,
                Price = book.GetPrice(),
            });

            return result;
        }
    }
}