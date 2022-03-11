using Microsoft.AspNetCore.Mvc;


namespace WebStoreAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<BookController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public SearchController(ILogger<BookController> logger, WebStoreContext context)
        {
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet(Name = "search")]
        public IEnumerable<BookDTO> Get(string searchParams)
        {
            var result = _webStoreContext.Book.Where(x => x.Title.Contains(searchParams) || x.Author.Contains(searchParams)).Select(book => new BookDTO
            {
                Author = book.Author,
                Title = book.Title,
                BookId = book.BookId,
                ImageUrl = book.ImageUrl,
                Price = book.Cost * (1 + book.Markup / 100)
            });
            return result;
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
               Price = book.Cost * (1 + book.Markup / 100)
           });

           return result;
        }
    }
}
