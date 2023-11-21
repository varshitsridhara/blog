using BlogAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BlogAPI.Data
{
    public class BlogData
    {
        private readonly AppDBContext _db;
        public BlogData(AppDBContext _db)
        {
            this._db = _db;

        }
        public List<BlogModel> GetBlogs()

        {
            var blogs = _db.Blogs.Include(x => x.user).ToList();
            blogs = blogs.Select(x => new BlogModel
            {
                Id = x.Id,
                Title = x.Title,
                Content = x.Content,
                CreatedAt = x.CreatedAt,
                UpdatedAt = x.UpdatedAt,
                OwnerName = x.user?.UserName,

            }).ToList();
            return blogs;
        }
        public List<BlogModel> GetUserBlog(long userId)
        {

            var blogs = _db.Blogs.Where(x => x.user!.Id == userId).ToList();
            if (blogs is null)
            {
                throw new KeyNotFoundException("No Blogs found");
            }
            return blogs;
        }
        public BlogModel GetBlog(long Id)
        {
            var blog = _db.Blogs.Where(x => x.Id == Id).Include(x => x.user).FirstOrDefault();
            blog.user.Password = null;
            if (blog is null)
            {
                throw new KeyNotFoundException("Blog not found");
            }
            return blog;
        }
        public bool UpdateBlog(BlogModel blog)
        {
            var resBlog = _db.Blogs.Where(x => x.Id == blog.Id).FirstOrDefault();
            if (resBlog == null)
            {
                throw new KeyNotFoundException("Blog not found");

            }
            resBlog.Title = blog.Title;
            resBlog.Content = blog.Content;
            resBlog.UpdatedAt = DateTime.UtcNow;
            _db.SaveChanges();
            return true;

        }
        public bool AddBlog(BlogModel blog,long userId)
        {
            var user = _db.Users.Where(x => x.Id == userId).FirstOrDefault();
            if(user != null)
            {
                blog.user=user;
                _db.Blogs.Add(blog);
                _db.SaveChanges();
                return true;

            }
            else { return false; }
        }
        public bool DeleteBlog(long Id)
        {
            var resBlog = _db.Blogs.Where(x => x.Id == Id).FirstOrDefault();
            if (resBlog is null)
            {
                throw new KeyNotFoundException("Blog not found");
            }
            _db.Remove(resBlog);
            _db.SaveChanges();
            return true;
        }
    }
}
