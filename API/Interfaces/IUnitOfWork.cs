namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IProductRepository ProductRepository { get; }
        IStockRepository StockRepository { get; }
        ICartRepository CartRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}