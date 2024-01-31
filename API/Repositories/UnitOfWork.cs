using API.Data;
using API.Interfaces;
using AutoMapper;

namespace API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _ctx;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_ctx, _mapper);
        public IProductRepository ProductRepository => new ProductRepository(_ctx);
        public IStockRepository StockRepository => new StockRepository(_ctx);

        public async Task<bool> Complete()
        {
            return await _ctx.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _ctx.ChangeTracker.HasChanges();
        }
    }
}