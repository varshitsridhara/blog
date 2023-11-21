using AutoMapper.Configuration.Annotations;
using BlogAPI.Data;
using System.ComponentModel.DataAnnotations;

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
        public User? user { get; set; }

    }
}
