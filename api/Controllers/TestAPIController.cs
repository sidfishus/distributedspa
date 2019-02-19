using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DistributedSPA.API.Models;
using Microsoft.AspNetCore.Authorization;

//sidtodo here
// This page helped with authorisation:
// https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-2.2&tabs=visual-studio
namespace DistributedSPA.API.Controllers
{
    [Route("[controller]")]
    //sidtodo [Authorize]
    public class TestAPIController : Base
    {
        // GET TestAPI/TestAction
        [HttpGet("TestAction")]
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
