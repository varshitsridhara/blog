using AutoMapper.Configuration.Annotations;
using BlogAPI.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogAPI.Models
{
    public class BlogModel
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        [Ignore]
        public string? OwnerName { get; set; }
        public long Likes { get; set; }
        [ForeignKey("User")]
        public long userId { get; set; }
        public User? User { get; set; }
        public List<Comment>? Comments {  get; set; }

    }
}
