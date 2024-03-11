using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly DataContext _context;

        public CartRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CartItem>> GetCartItemsAsync()
        {
            return await _context.CartItems
                .Include(sci => sci.Product)
                .ToListAsync();
        }

        public async Task<CartItem> GetCartItemByIdAsync(int id)
        {
            return await _context.CartItems
                .Include(sci => sci.Product)
                .FirstOrDefaultAsync(sci => sci.Id == id);
        }

        public void AddToCart(CartItem cartItem)
        {
            _context.CartItems.Add(cartItem);
        }

        public void RemoveFromCart(CartItem cartItem)
        {
            _context.CartItems.Remove(cartItem);
        }
    }
}
