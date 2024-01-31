namespace API.Entities
{
    public class OrderProduct
    {
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int StockId { get; set; }
        public Stock Stock { get; set; }
        public int Qty { get; set; }
    }
}