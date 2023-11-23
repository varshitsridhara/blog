using BlogAPI.Data;
using BlogAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly CommentData _commentData;
        public CommentController(CommentData commentData)
        {
            this._commentData=commentData;
        }

        [HttpGet("{parentCommentId:long}")]
        public IActionResult GetCommentsByParentCommentId(long parentCommentId)
        {
            return Ok(_commentData.FindCommentByParentCommentId(parentCommentId));
        }
        [HttpPut]
        public IActionResult UpdateComment(Comment comment)
        {
            return Ok(_commentData.UpdateComment(comment));
        }
        [HttpDelete]
        public IActionResult DeleteComment(long id)
        {
            return
                Ok(_commentData.DeleteComment(id));
        }
        [HttpPost("ParentComment")]
        public IActionResult AddComment(Comment comment)
        {
            return Created("comment", _commentData.AddParentComment(comment));
        }
        [HttpPost("SubComment/{id:long}")]
        public IActionResult AddSubComment(Comment comment,long id)
        {
            return Created("comment", _commentData.AddSubComment(comment, id));
        }
           
    }
}
