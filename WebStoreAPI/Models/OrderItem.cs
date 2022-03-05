namespace WebStoreAPI
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
    }
}
