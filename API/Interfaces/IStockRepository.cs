using API.Entities;

namespace API.Interfaces
{
    public interface IStockRepository
    {
        Task<Stock> GetStockByIdAsync(int id);
        Task<IEnumerable<Stock>> GetStocksAsync();
        void AddStock(Stock stock);
        void UpdateStock(Stock stock);
        void DeleteStock(Stock stock);
    }
}