using BlogAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            _db.Users.Add(user);
            _db.SaveChanges();
            return GetUser(user.Email!);
        }
        public bool ValidateUser(User user)
        {
            var resUser = _db.Users.Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefault();
            if (resUser != null)
            {
                return true;

            }
            return false;
        }
        public User GetUser(string email)
        {
            var user = _db.Users.Where(x => x.Email == email).FirstOrDefault();
            if (user is null)
            {
                throw new Exception("User not found");
            }
            return user;
        }
        public bool DeleteUser(User user)
        {
            var resUser = _db.Users.Where(x => x.Id == user.Id).FirstOrDefault();
            if (resUser is null)
            {
                throw new Exception("User not found");
            }
            _db.Users.Remove(resUser);
            return true;
        }
    }
}
