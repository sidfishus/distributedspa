using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using static Microsoft.AspNetCore.Http.AuthenticationManagerExtensions;
using System;
using DistributedSPA.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;

namespace DistributedSPA.IdentityServer {

    [Authorize]
    public class AccountController : Controller {

        private SignInManager<AppUser> m_SignInMgr;

        public AccountController(
            SignInManager<AppUser> signInManager) {
            
            m_SignInMgr = signInManager;
        }

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
                //sidtodo current login checkbox: remember me
                //sidtodo expiration time.
                IsPersistent = true,
                ExpiresUtc = System.DateTimeOffset.UtcNow.Add(new System.TimeSpan(0,1,0))
            };

            //sidtodo correct sign in details

            var result = await m_SignInMgr.PasswordSignInAsync("Admin","53bf3cca-4313-44fc-a421-1ee2131dc788aA!", true /* Remember login */, false);

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