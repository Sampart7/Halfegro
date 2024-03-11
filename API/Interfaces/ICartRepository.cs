using API.Entities;

namespace API.Interfaces
{
    public interface ICartRepository
    {
        Task<IEnumerable<CartItem>> GetCartItemsAsync();
        Task<CartItem> GetCartItemByIdAsync(int id);
        void AddToCart(CartItem shoppingCartItem);
        void RemoveFromCart(CartItem shoppingCartItem);
    }
}
