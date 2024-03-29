using System.Text;
using System.Text.Json.Serialization;
using API.Data;
using API.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using API.Repositories;
using API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<IEmailSender, EmailSenderService>();

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddCors();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
            ValidateIssuer = false,
            ValidateAudience = false,
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = ctx => {
                var accessToken = ctx.Request.Query["access_token"];
                var path = ctx.HttpContext.Request.Path;

                if(!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/hubs")) ctx.Token = accessToken;

                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddSignalR();

var app = builder.Build();

var applicationLifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();

applicationLifetime.ApplicationStopping.Register(() =>
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
        
        dbContext.SaveChanges();
    }
});

app.UseHttpsRedirection();

app.UseCors(builder => builder.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("https://localhost:4200"));  

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
