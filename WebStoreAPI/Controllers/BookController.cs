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
        public  IEnumerable<Book> Get()
        {
            var result =  _webStoreContext.Book.Where(x => x.BookId > 0);
            return result;
        }
    }
}