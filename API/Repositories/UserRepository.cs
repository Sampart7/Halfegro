using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _ctx;
        private readonly IMapper _mapper;
        public UserRepository(DataContext ctx, IMapper mapper)
        {
            _mapper = mapper;
            _ctx = ctx;
        }

        public async Task<MemberDTO> GetMemberAsync(string email)
        {
            return await _ctx.Users
                .Where(x => x.Email == email)
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<List<MemberDTO>> GetMembersAsync()
        {
            return await _ctx.Users
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _ctx.Users.FindAsync(id);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _ctx.Users.SingleOrDefaultAsync(x => x.Email == email);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _ctx.Users.ToListAsync();
        }

        public void Update(User user)
        {
            _ctx.Entry(user).State = EntityState.Modified;
        }
    }
}