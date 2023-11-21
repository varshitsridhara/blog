using BlogAPI.Data;
using BlogAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly BlogData _blogData;
        public BlogController(BlogData blogData)
        {
            _blogData = blogData;
        }

        [HttpGet("/blogs")]
        public IActionResult GetBlogs()
        {
            return Ok(_blogData.GetBlogs());
        }
        [HttpGet("/blog/{id:long}")]
        [Authorize]
        public IActionResult GetBlog(long id)
        {

            return Ok(_blogData.GetBlog(id));
        }
        [HttpGet("/user/{id:long}/blogs")]
        [Authorize]
        public IActionResult GetUserBlog(long id)
        {
            long userId = Convert.ToInt64(HttpContext.User.Claims.Where(x => x.Type.Equals("UserId", StringComparison.OrdinalIgnoreCase)).FirstOrDefault()?.Value);
            return Ok(_blogData.GetUserBlog(userId));
        }
        [HttpPost("/blog")]
        [Authorize]
        public IActionResult AddBlog(BlogModel blog)
        {
            return Ok(_blogData.AddBlog(blog));
        }
        [HttpPut("/blog")]
        [Authorize]
        public IActionResult UpdateBlog(BlogModel blog)
        {
            long userId = Convert.ToInt64(HttpContext.User.Claims.Where(x => x.Type.Equals("UserId", StringComparison.OrdinalIgnoreCase)).FirstOrDefault()?.Value);
            var currBlog = _blogData.GetBlog(blog.Id);
            if (currBlog.user?.Id != userId)
            {
                return Unauthorized();
            }
            return Ok(_blogData.UpdateBlog(blog));
        }
        [HttpDelete("/blog")]
        [Authorize]
        public IActionResult DeleteBlog(long id)
        {
            long userId = Convert.ToInt64(HttpContext.User.Claims.Where(x => x.Type.Equals("UserId", StringComparison.OrdinalIgnoreCase)).FirstOrDefault()?.Value);
            var currBlog = _blogData.GetBlog(id);
            if (currBlog.user?.Id != userId)
            {
                return Unauthorized();
            }
            return Ok(_blogData.DeleteBlog(id));
        }
    }
}
