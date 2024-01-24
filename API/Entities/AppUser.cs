namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateofBirth { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string City { get; set; }
        public string Country { get; set; }
    }
}