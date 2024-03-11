namespace API.Entities
{
    public class Stock
    {
        public int Id { get; set; }
        public int Qty { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}