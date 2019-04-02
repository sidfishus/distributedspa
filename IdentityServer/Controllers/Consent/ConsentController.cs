using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System;

namespace DistributedSPA.IdentityServer {

    [Authorize]
    public class ConsentController : Controller {

        //sidtodo [AllowAnonymous] ?
        public IActionResult Index(string returnUrl)
        {
            return View("../Account/Login");
        }
    }
}