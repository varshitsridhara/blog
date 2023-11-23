using BlogAPI.Models;

namespace BlogAPI.Data
{
    public class CommentData
    {
        private readonly AppDBContext _db;
        public CommentData(AppDBContext _db)
        {
            this._db= _db;
        }
        public List<Comment>? GetCommentsByBlogId(long id)
        {
            BlogModel? b=_db.Blogs.Find(id);
            if (b == null)
                throw new KeyNotFoundException("Blog not found");
            List<Comment>? comments= _db.Comments.Where(x=>x.BlogId==b.Id).ToList();
            foreach(Comment comment in comments) {
                comment.HasSubComment = HasSubComments(comment.CommentId);
            }
            return comments;    


        }
        public List<Comment>? FindCommentByParentCommentId(long parentCommentId)
        {
            List<Comment>? comments = _db.Comments.Where(x=>x.ParentCommentId==parentCommentId).ToList();
            foreach (Comment comment in comments)
            {
                comment.HasSubComment = HasSubComments(comment.CommentId);
            }
            return comments;
        }
        public bool AddParentComment(Comment comment)
        {
            _db.Comments.Add(comment);
            _db.SaveChanges();
            return true;
        }
        public bool AddSubComment(Comment comment, long parentId)
        {
            Comment? parentComment = _db.Comments.Find(parentId);
            if (parentComment == null)
                throw new KeyNotFoundException("Parent comment not found");
            comment.ParentComment=parentComment;
            _db.Comments.Add(comment);
            _db.SaveChanges();
            return true;
        }
        public bool UpdateComment(Comment comment)
        {
            _db.Comments.Update(comment);
            _db.SaveChanges();
            return true;
        }
        public bool DeleteComment(long id)
        {
            Comment? comment = _db.Comments.Find(id);
            if (comment == null)
                throw new KeyNotFoundException("Comment not found");
            _db.Comments.Remove(comment);
            _db.SaveChanges();
            return true;
        }

        public bool HasSubComments(long commentId)
        {
            return _db.Comments.Any(x => x.ParentCommentId == commentId);
        }
    }
}
