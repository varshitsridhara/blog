using BlogAPI.Models;
using BC = BCrypt.Net.BCrypt;

namespace BlogAPI.Data
{
    public class UserData
    {
        private readonly AppDBContext _db;
        public UserData(AppDBContext _db)
        {
            this._db = _db;

        }
        public User CreateUser(User user)
        {
            // validate
            if (_db.Users.Any(x => x.Email == user.Email))
                throw new Exception("User with the email '" + user.Email + "' already exists");


            // hash password
            user.Password =  BC.HashPassword(user.Password);
            user.Id = null;
            // save user
            _db.Users.Add(user);
            _db.SaveChanges();
            return GetUser(user.Email!);
        }
        public User? ValidateUser(User user)
        {
            var resUser = _db.Users.Where(x => x.Email == user.Email).FirstOrDefault();
            if (resUser == null)
            {
                throw new KeyNotFoundException("User not Found");
            }
            bool verify = BC.Verify(user.Password, resUser.Password);
            if (verify)
            {
                return resUser;

            }
            else throw new  Exception("UserName or Password donot match");

        }
        public User GetUser(string email)
        {
            var user = _db.Users.Where(x => x.Email == email).FirstOrDefault();
            if (user is null)
            {
                throw new KeyNotFoundException("User not found");
            }
            return user;
        }
        public bool DeleteUser(User user)
        {
            var resUser = _db.Users.Where(x => x.Id == user.Id).FirstOrDefault();
            if (resUser is null)
            {
                throw new KeyNotFoundException("User not found");
            }
            _db.Users.Remove(resUser);
            return true;
        }
    }
}
