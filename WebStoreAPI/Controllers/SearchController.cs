using Microsoft.AspNetCore.Mvc;


namespace WebStoreAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<CatalogController> _logger;

        private readonly WebStoreContext _webStoreContext;

        public SearchController(ILogger<CatalogController> logger, WebStoreContext context)
        {
            _logger = logger;
            _webStoreContext = context;
        }

        [HttpGet(Name = "Search")]
        public IEnumerable<BookDTO> Get(string searchParams)
        {
            var result = _webStoreContext.Book.Where(x => x.Title.Contains(searchParams) || x.Author.Contains(searchParams)).Select(book => new BookDTO
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
