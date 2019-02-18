using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DistributedSPA.API.Models;

namespace DistributedSPA.API.Controllers
{
    [Route("[controller]")]
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
