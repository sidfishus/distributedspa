using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DistributedSPA.API;

namespace DistributedSPA.API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    [ValidateAntiForgeryToken]
    public class AccountController : Base
    {
        // POST Account/Login
        [HttpPost("Login")]
        [AllowAnonymous]
        //sidtodo return type?
        public ActionResult Login(Models.Login login)
        {
            return new OkResult();
        }
    }
}