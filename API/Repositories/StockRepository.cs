using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class StockRepository : IStockRepository
    {
        private readonly DataContext _context;
        public StockRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Stock> GetStockByIdAsync(int id)
        {
            return await _context.Stock
                .Include(s => s.Product)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<Stock>> GetStocksAsync()
        {
            return await _context.Stock
                .Include(s => s.Product)
                .ToListAsync();
        }

        public void AddStock(Stock stock)
        {
            _context.Stock.Add(stock);
        }

        public void UpdateStock(Stock stock)
        {
            _context.Entry(stock).State = EntityState.Modified;
        }

        public void DeleteStock(Stock stock)
        {
            _context.Stock.Remove(stock);
        }
    }
}
