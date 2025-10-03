using crud.Models;
using crud.Repositories;
using crud.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactDev", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    }); 


builder.Services.AddOpenApi();
builder.Services.AddDbContext<CrudContext>();
builder.Services.AddScoped<DirectorService>();
builder.Services.AddScoped<DirectorRepository>();
builder.Services.AddControllers(); 
builder.Services.AddScoped<MovieService>();
builder.Services.AddScoped<MovieRepository>();

//Director director = new Director(1, "Juan", Nationality.Mexican, 22, true);
//Console.Write(director);

//Movie movie = new Movie(1, "Vengadores", new DateOnly(2024,9,30), MovieGenre.Action, new TimeSpan(2,30,0), 1);
//Console.Write(movie);



var app = builder.Build();

app.UseCors("ReactDev");
app.MapControllers();  // <- mapea todos los controladores


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();


app.Run();


