namespace WebStoreAPI
{
    public class CartItem
    {
        public string CartItemId { get; set; }
        public DateTime CreatedAt { get; set; }

        public int BookId { get; set; }

        public Book Book { get; set; }

        public int CartId { get; set; }

        public Cart Cart { get; set; }
    }

    public class CreateCartItemDTO
    {
        public int BookId { get; set; }
    }
}
