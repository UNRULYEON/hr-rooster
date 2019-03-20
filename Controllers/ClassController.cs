using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using hr_rooster.Models;

namespace playground.Controllers
{
	[Produces("application/json")]
	public class ClassController : ODataController
  {
    private readonly IndicesDbContext context;
    public ClassController(IndicesDbContext context)
    {
      this.context = context;
    }

    [EnableQuery]
    public IActionResult Get()
    {
      return Ok(context.Classes);
    }

    [EnableQuery]
    public IActionResult GetInstitute(string key)
    {
      return Ok(context.Classes.FirstOrDefault(c => c.Class == key));
    }

    [EnableQuery]
    public IActionResult Get(string key)
    {
      return Ok(context.Classes.FirstOrDefault(c => c.Class == key));
    }
  }
}
