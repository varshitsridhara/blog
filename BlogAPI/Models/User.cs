using System.ComponentModel.DataAnnotations;

namespace BlogAPI.Models
{
    public class User
    {
        [Key]
        public long? Id { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        public string? UserName { get; set; }
        public User(long Id, string Email, string password, string UserName)
        {
            this.Id = Id;
            this.Email = Email;
            this.Password = password;
            this.UserName = UserName;

        }
        public User() { }
    }
}
