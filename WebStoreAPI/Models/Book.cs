namespace WebStoreAPI
{
    public class Book
    {
        public int BookId { get; set; }
        public DateTime CreatedAt { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }
        
        public  string? ImageUrl { get; set; }

        public string Category { get; set; }

        public decimal Cost { get; set; }
        public decimal Markup { get; set; }
        

        public List<CartItem> Items { get; set; }
        public decimal GetPrice()
        {
            return this.Cost * (1 + this.Markup / 100);
        }
    }

    public class BookDTO
    {
        public int BookId { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string? ImageUrl { get; set; }


        public decimal Price { get; set; }

    }
    public class CreateBookDTO
    {
        public int BookId { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string? ImageUrl { get; set; }

        public string Category { get; set; }

        public decimal Cost { get; set; }
        public decimal Markup { get; set; }

    }
}