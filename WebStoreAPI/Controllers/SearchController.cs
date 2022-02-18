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
        public IEnumerable<Book> Get(string searchParams)
        {
            var result = _webStoreContext.Book.Where(x => x.Title.Contains(searchParams) || x.Author.Contains(searchParams));
            return result;
        }
    }
}
