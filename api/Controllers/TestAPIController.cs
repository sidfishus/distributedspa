using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DistributedSPA.API.Models;
using Microsoft.AspNetCore.Authorization;

// This page helped with authorisation:
// https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-2.2&tabs=visual-studio

// Authentication via Microsoft:
// https://docs.microsoft.com/en-us/aspnet/core/security/authentication/social/microsoft-logins?view=aspnetcore-2.2

// Also the series starting here:
// https://andrewlock.net/introduction-to-authentication-with-asp-net-core/

namespace DistributedSPA.API.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class TestAPIController : Base
    {
        // GET TestAPI/TestAction
        [HttpGet("TestAction")]
        [Authorize("IsAdmin")]
        public ActionResult<IEnumerable<TestActionModel>> TestAction()
        {
            // Return some arbitrary data
            return ControllerFunction<IEnumerable<TestActionModel>>(() => {
                return new TestActionModel[] {
                    new TestActionModel {
                        Property1 = "Model1Prop1",
                        Property2 = 1
                    },
                    new TestActionModel {
                        Property1 = "Model2Prop1",
                        Property2 = 2,
                    }
                };
            });
        }
    }
}
