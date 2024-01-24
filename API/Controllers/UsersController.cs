using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<MemberDTO>> GetUsers()
        {
            var users = await _unitOfWork.UserRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            return await _unitOfWork.UserRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdateDTO)
        {
            var email = User.GetEmail();
            var user = await _unitOfWork.UserRepository.GetUserByEmailAsync(email);

            if (user == null) return NotFound();

            _mapper.Map(memberUpdateDTO, user);
            _unitOfWork.UserRepository.Update(user);

            if (await _unitOfWork.Complete()) return NoContent();
            return BadRequest("Failed to update user");
        }
    }
}