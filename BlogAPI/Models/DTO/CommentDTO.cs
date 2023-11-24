using BlogAPI.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Models.DTO
{
    public class CommentDTO
    {
        public long CommentId { get; set; }
        public string? Content { get; set; }
        public long Likes { get; set; }
        public long BlogId { get; set; }
        public long? ParentCommentId { get; set; }
        [NotMapped]
        public bool HasSubComment
        {
            get; set;
        }
        public Comment? ParentComment { get; set; }
        

    }
}
