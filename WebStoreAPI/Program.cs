using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebStoreAPI;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("https://localhost:4200")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();

// Add EF Core config
builder.Services.AddDbContext<WebStoreContext>(
    options => options.UseSqlServer("Data Source=localhost;Initial Catalog=master;User ID=sa;Password=Pass@word1"));

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<WebStoreContext>()
    .AddDefaultTokenProviders();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
