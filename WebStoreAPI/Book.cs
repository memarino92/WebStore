namespace WebStoreAPI
{
    public class Book
    {
        public int BookId { get; set; }
        public DateTime CreatedAt { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }
        
        public  string? ImageUrl { get; set; }

        public string? Summary { get; set; }

        public decimal? Price { get; set; }

        public List<CartItem> Items { get; set; }
    }
}