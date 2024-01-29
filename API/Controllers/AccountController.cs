using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _ctx;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(DataContext ctx, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _ctx = ctx;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.Email)) return BadRequest("Email is taken");
            if (await UserExists(registerDTO.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<User>(registerDTO);

            using var hmac = new HMACSHA512();

            user.Email = registerDTO.Email.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
            user.PasswordSalt = hmac.Key;
            user.VerificationToken = _tokenService.CreateToken(user);

            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(user => user.Email == loginDTO.Email);

            if (user == null) return Unauthorized("Invalid Email");

            if (user.VerifiedAt == null) return BadRequest("Not verified!");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDTO
            {
                Username = user.Username,
                Email = user.Email,
                VerificationToken = user.VerificationToken,
            };
        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify(string token)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.VerificationToken == token);
            if (user == null) return BadRequest("Invalid token.");

            user.VerifiedAt = DateTime.Now;
            await _ctx.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null) return BadRequest("User not found.");

            user.PasswordResetToken = _tokenService.CreateToken(user);
            user.ResetTokenExpires = DateTime.Now.AddDays(1);
            await _ctx.SaveChangesAsync();

            return Ok("You may now reset your password.");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResettPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.PasswordResetToken == resetPasswordDTO.Token);
            if (user == null || user.ResetTokenExpires < DateTime.Now) return BadRequest("Invalid Token.");

            using var hmac = new HMACSHA512();

            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(resetPasswordDTO.Password));
            user.PasswordSalt = hmac.Key;
            user.PasswordResetToken = null;
            user.ResetTokenExpires = null;

            await _ctx.SaveChangesAsync();

            return Ok("Password successfully reset.");
        }

        private async Task<bool> UserExists(string name)
        {
            return await _ctx.Users.AnyAsync(x => x.Email == name.ToLower() || x.Username == name.ToLower());
        }
    }
}