using BlogAPI.Data;
using BlogAPI.Models;
using BlogAPI.Models.DTO;
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
        [HttpGet("{id:long}")]
        public IActionResult GetCommentById(long id)
        {
            return Ok(_commentData.GetCommentById(id));
        }
        [HttpGet("{parentCommentId:long}/subComments")]
        public IActionResult GetCommentsByParentCommentId(long parentCommentId)
        {
            return Ok(_commentData.FindCommentByParentCommentId(parentCommentId));
        }
        [HttpPut]
        public IActionResult UpdateComment(Comment comment)
        {
            return Ok(_commentData.UpdateComment(comment));
        }
        [HttpDelete("{id:long}")]
        public IActionResult DeleteComment(long id)
        {
            return
                Ok(_commentData.DeleteComment(id));
        }
        [HttpPost("ParentComment")]
        public IActionResult AddComment(CommentDTO commentDTO)
        {
            Comment comment = new Comment
            {
                BlogId = commentDTO.BlogId,
                Content = commentDTO.Content,

            };
            return Created("comment", _commentData.AddParentComment(comment));
        }
        [HttpPost("{id:long}/SubComment")]
        public IActionResult AddSubComment([FromBody]CommentDTO commentDTO,long id)
        {
            Comment comment = new Comment
            {
                Content = commentDTO.Content,
                ParentCommentId=commentDTO.ParentCommentId,
                
            };
            return Created("comment", _commentData.AddSubComment(comment, id));
        }
           
    }
}
