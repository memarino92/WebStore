namespace WebStoreAPI
{
    public class Cart
    {
        public int CartId { get; set; }
        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public bool IsActive { get; set; }

        public List<CartItem> Items { get; set;}

    }
}
