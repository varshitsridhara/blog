using BlogAPI.Models;

namespace BlogAPI.Controllers
{
    internal class AuthenticatedResponse
    {
        public string? Token { get; set; }
        public User? user { get; set; }
    }
}