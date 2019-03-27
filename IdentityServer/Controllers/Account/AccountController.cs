using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using static Microsoft.AspNetCore.Http.AuthenticationManagerExtensions;
using System;

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

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login()
        {
            AuthenticationProperties props = null;
            props = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = System.DateTimeOffset.UtcNow.Add(new System.TimeSpan(0,5,0))
            };

            //sidtodo here - as well as SSR / node services
            await HttpContext.SignInAsync("1", "username", props);

            if (Url.IsLocalUrl(ViewBag.ReturnUrl))
            {
                return Redirect(ViewBag.ReturnUrl);
            }
            else if (string.IsNullOrEmpty(ViewBag.ReturnUrl))
            {
                return Redirect("~/");
            }
            // user might have clicked on a malicious link - should be logged
            throw new Exception("invalid return URL");
        }
    }
}