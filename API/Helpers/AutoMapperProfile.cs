using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, MemberDTO>()
                .ForMember(x => x.Age,
                    option => option.MapFrom(source =>
                        source.DateofBirth.CalculateAge()));
                        
            CreateMap<MemberUpdateDTO, User>();
            CreateMap<RegisterDTO, User>();
            
            CreateMap<DateTime, DateTime>()
                .ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
            CreateMap<DateTime?, DateTime?>()
                .ConvertUsing(d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);
        }
    }
}