using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CartController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CartItem>>> GetCart()
    {
        var cartItems = await _unitOfWork.CartRepository.GetCartItemsAsync();

        return Ok(cartItems);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CartItem>> GetCartItem(int id)
    {
        var cartItem = await _unitOfWork.CartRepository.GetCartItemByIdAsync(id);
        if (cartItem == null) return NotFound();

        return Ok(cartItem);
    }

    [HttpPost]
    public async Task<ActionResult<CartItem>> AddToCart([FromBody] CartItemDTO cartItemDTO)
    {
        var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(cartItemDTO.ProductId);
        if (product == null) return NotFound("Product not found");

        var cartItem = new CartItem
        {
            Product = product,
            Quantity = cartItemDTO.Quantity
        };

        _unitOfWork.CartRepository.AddToCart(cartItem);
        await _unitOfWork.Complete();

        return CreatedAtAction(nameof(GetCartItem), new { id = cartItem.Id }, cartItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveFromCart(int id)
    {
        var cartItem = await _unitOfWork.CartRepository.GetCartItemByIdAsync(id);
        if (cartItem == null) return NotFound();

        _unitOfWork.CartRepository.RemoveFromCart(cartItem);
        await _unitOfWork.Complete();

        return NoContent();
    }
}
