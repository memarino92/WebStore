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
        public async Task<ActionResult<IEnumerable<BookDTO>>> Get()
        {
            try
            {
                var result =  _webStoreContext.Book.Select(book => new BookDTO
                {
                    Author = book.Author,
                    Title = book.Title,
                    BookId = book.BookId,
                    ImageUrl = book.ImageUrl,
                    Price = book.GetPrice(),
                }).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }

        [HttpPost(Name = "CreateBook")]
        public async Task<ActionResult<CreateBookDTO>> CreateBook([FromBody] CreateBookDTO book)
        {
            try
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
                return Ok(bookToReturn);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }

        [HttpGet(Name = "GetBooksForAdmin")]
        public async Task<ActionResult<IEnumerable<CreateBookDTO>>> GetBooksForAdmin()
        {
            try
            {
                var result = _webStoreContext.Book.Select(book => new CreateBookDTO
                {
                    Author = book.Author,
                    Title = book.Title,
                    BookId = book.BookId,
                    ImageUrl = book.ImageUrl,
                    Cost = book.Cost,
                    Markup = book.Markup,
                    Category = book.Category
                }).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }

        [HttpDelete(Name = "DeleteBook")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
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
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
            
        }

        [HttpGet("{category}", Name = "GetBooksByCategory")]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooksByCategory(string category)
        {
            try
            {
                var result = _webStoreContext.Book.Where(x => x.Category == category).Select(book => new BookDTO
                {
                    Author = book.Author,
                    Title = book.Title,
                    BookId = book.BookId,
                    ImageUrl = book.ImageUrl,
                    Price = book.GetPrice(),
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500);
            }
        }
    }
}