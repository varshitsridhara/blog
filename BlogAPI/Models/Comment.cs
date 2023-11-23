using BlogAPI.Data;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogAPI.Models
{
    public class Comment
    {
        [Key]
        public long CommentId { get; set; }
        public string? Content { get; set; }
        public long Likes { get; set; }
        [ForeignKey("BlogModel")]
        public long BlogId {  get; set; }
        public long? ParentCommentId {  get; set; }
        [NotMapped]
        public bool HasSubComment
        {
            get;set;
        }
        public Comment? ParentComment { get; set; }
        public List<Comment>? Comments { get; set;}
        [NotMapped]
        private CommentData? commentData;

        public Comment() { }
    }
}
