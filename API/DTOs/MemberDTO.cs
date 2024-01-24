namespace API.DTOs
{
    public class MemberDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}