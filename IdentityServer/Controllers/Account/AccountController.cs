using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DistributedSPA.IdentityServer {

    [Authorize]
    public class AccountController : Controller {

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl=returnUrl;
            return View();
        }
    }
}