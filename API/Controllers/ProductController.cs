using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    public ProductController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromBody] ProductDTO productDTO)
    {
        var product = new Product
        {
            Name = productDTO.Name,
            Description = productDTO.Description,
            Value = productDTO.Value
        };

        _unitOfWork.ProductRepository.AddProduct(product);
        await _unitOfWork.Complete();

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(id);

        if (product == null) return NotFound();

        return product;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        var products = await _unitOfWork.ProductRepository.GetProductsAsync();

        return Ok(products);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct([FromBody] Product productDTO)
    {
        var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(productDTO.Id);
        if (product == null) return NotFound();

        product.Name = productDTO.Name;
        product.Description = productDTO.Description;
        product.Value = productDTO.Value;

        _unitOfWork.ProductRepository.UpdateProduct(product);
        await _unitOfWork.Complete();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _unitOfWork.ProductRepository.GetProductByIdAsync(id);
        if (product == null) return NotFound();

        _unitOfWork.ProductRepository.DeleteProduct(product);
        await _unitOfWork.Complete();

        return NoContent();
    }
}
