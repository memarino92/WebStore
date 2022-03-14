namespace WebStoreAPI
{
    public class Order
    {
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public List<OrderItem> Items { get; set;}
    }

    public class OrderDTO
    {
        public int OrderId { get; set; }

        public string UserId { get; set; }

        public List<BookDTO> BookDTOs { get; set; }
    }
}
