using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using static Microsoft.AspNetCore.Http.AuthenticationManagerExtensions;
using System;
using DistributedSPA.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using IdentityServer4.Services;

namespace DistributedSPA.IdentityServer {

    [Authorize]
    public class AccountController : Controller {

        private SignInManager<AppUser> m_SignInMgr;
        private readonly IIdentityServerInteractionService m_Interaction;

        public AccountController(
            SignInManager<AppUser> signInManager,
            IIdentityServerInteractionService interaction) {
            
            m_SignInMgr = signInManager;
            m_Interaction=interaction;
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
        public async Task<IActionResult> PostLogin([FromBody] LoginModel model)
        {

            var result = await m_SignInMgr.PasswordSignInAsync(model.Username, model.Password, model.RememberMe, false);
            if(!result.Succeeded) {
                return Unauthorized("Invalid user of password.");
            }

            if (Url.IsLocalUrl(model.ReturnUrl))
            {
                return Ok(model.ReturnUrl);
            }
            else if (string.IsNullOrEmpty(model.ReturnUrl))
            {
                return Ok("~/");
            }
            // user might have clicked on a malicious link - should be logged
            throw new Exception("invalid return URL");
        }

        // Logout a user
        // Returns the redirect link
        [HttpGet("[controller]/logout")]
        public async Task<IActionResult> GetLogout(string logoutId)
        {
            var logout = await m_Interaction.GetLogoutContextAsync(logoutId);
            await m_SignInMgr.SignOutAsync();

            return Redirect(logout?.PostLogoutRedirectUri);
        }
    }
}