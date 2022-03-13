using Microsoft.AspNetCore.Mvc;


namespace WebStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ILogger<BookController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public CategoriesController(ILogger<BookController> logger, WebStoreContext context)
        {
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet("{category}")]
        public IEnumerable<BookDTO> Category(string category)
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