namespace WebStoreAPI
{
    public class Book
    {
        public int BookId { get; set; }
        public DateTime CreatedAt { get; set; }

        public string Name { get; set; }

        public string Author { get; set; }
        
        public  string? ImageUrl { get; set; }

        public string? Summary { get; set; }
    }
}