using Microsoft.AspNetCore.Mvc;
using Services.CouponAPI.Data;
using Services.CouponAPI.Models;

namespace Services.CouponAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CouponAPIController:ControllerBase
    {
        private readonly AppDbContext _db;
        public CouponAPIController(AppDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public IActionResult Get()
        {
            
                List<Coupon> list = _db.Coupons.ToList();
                return Ok(list);

        }
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            Coupon coupon = _db.Coupons.First(coupon=> coupon.Id == id);
            return Ok(coupon);
        }
    }
}
