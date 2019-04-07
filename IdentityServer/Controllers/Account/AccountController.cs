using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using static Microsoft.AspNetCore.Http.AuthenticationManagerExtensions;
using System;

namespace DistributedSPA.IdentityServer {

    [Authorize]
    public class AccountController : Controller {

        [HttpGet("[controller]/Login")]
        [AllowAnonymous]
        public IActionResult GetLogin(string returnUrl)
        {
            return View("../SPA");
        }

        // Login a user
        // Returns the redirect link
        [HttpPost("[controller]/Login")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> PostLogin([FromBody] LoginModel model)
        {
            AuthenticationProperties props = null;
            props = new AuthenticationProperties
            {
                //sidtodo expiration time.
                //sidtodo login form choose whether to remain logged in
                IsPersistent = true,
                ExpiresUtc = System.DateTimeOffset.UtcNow.Add(new System.TimeSpan(0,5,0))
            };

            //sidtodo correct sign in details
            await HttpContext.SignInAsync("111", "username", props);

            if (Url.IsLocalUrl(model.ReturnUrl))
            {
                return model.ReturnUrl;
            }
            else if (string.IsNullOrEmpty(model.ReturnUrl))
            {
                return "~/";
            }
            // user might have clicked on a malicious link - should be logged
            throw new Exception("invalid return URL");
        }
    }
}