using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ResetPasswordDTO
    {
        [Required]
        public string Token { get; set; }
        [StringLength(24, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 24 characters")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$", 
        ErrorMessage = "Password must contain at least one uppercase letter and one special character")]
        public string Password { get; set; }
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}