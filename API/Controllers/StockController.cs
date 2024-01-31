using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class StockController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    public StockController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    public async Task<ActionResult<Stock>> CreateStock([FromBody] StockDTO stockDTO)
    {
        var stock = new Stock
        {
            Description = stockDTO.Description,
            Qty = stockDTO.Qty,
            ProductId = stockDTO.ProductId
        };

        _unitOfWork.StockRepository.AddStock(stock);
        await _unitOfWork.Complete();

        return CreatedAtAction(nameof(GetStock), new { id = stock.Id }, stock);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Stock>> GetStock(int id)
    {
        var stock = await _unitOfWork.StockRepository.GetStockByIdAsync(id);

        if (stock == null) return NotFound();

        return stock;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Stock>>> GetStocks()
    {
        var stocks = await _unitOfWork.StockRepository.GetStocksAsync();

        return Ok(stocks);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStock([FromBody] Stock stockDTO)
    {
        var stock = await _unitOfWork.StockRepository.GetStockByIdAsync(stockDTO.Id);
        if (stock == null) return NotFound();

        stock.Description = stockDTO.Description;
        stock.Qty = stockDTO.Qty;
        stock.ProductId = stockDTO.ProductId;

        _unitOfWork.StockRepository.UpdateStock(stock);
        await _unitOfWork.Complete();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStock(int id)
    {
        var stock = await _unitOfWork.StockRepository.GetStockByIdAsync(id);
        if (stock == null) return NotFound();

        _unitOfWork.StockRepository.DeleteStock(stock);
        await _unitOfWork.Complete();

        return NoContent();
    }
}
