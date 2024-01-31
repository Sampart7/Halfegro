namespace API.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderRef { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Country { get; set; }
        public OrderStatus Status { get; set; }
        // public ICollection<OrderStock> OrderStocks { get; set; }
    }
}