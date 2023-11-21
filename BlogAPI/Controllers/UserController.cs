using BlogAPI.Data;
using BlogAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase

    {
        private readonly UserData _userData;
        public UserController(UserData userData)
        {
            _userData = userData;
        }
        [HttpPost("register")]
        public IActionResult CreateUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            User currentUser = _userData.CreateUser(user);
            string tokenString = signToken(currentUser);
            return Ok(new AuthenticatedResponse
            {
                Token = tokenString,
                user = new Models.User
                {
                    Id = currentUser.Id,
                    UserName = currentUser.UserName,
                    Email = currentUser.Email,
                }
            });
        }
        [HttpGet("me/{email}")]
        [Authorize]
        public IActionResult GetUser(string email)
        {
            return Ok(_userData.GetUser(email));
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (user is null)
            {
                return BadRequest("Invalid client request");
            }
            var currentUser = _userData.ValidateUser(user);
            if (currentUser != null)
            {
                string tokenString = signToken(currentUser);
                return Ok(new AuthenticatedResponse { Token = tokenString, user = new Models.User
                {
                    Id = currentUser.Id,
                    UserName = currentUser.UserName,
                    Email = currentUser.Email,
                } 
                });
            }
            return Unauthorized();
        }
        private string signToken(User user)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
    {
        new Claim("UserId", user.Id.ToString()!),
    };

            var tokenOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddMinutes(100),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return tokenString;
        }

    }
}
