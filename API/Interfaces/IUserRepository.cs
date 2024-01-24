using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(User user);
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        Task<List<MemberDTO>> GetMembersAsync();
        Task<MemberDTO> GetMemberAsync(string username);
    }
}