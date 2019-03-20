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
	public class TeacherController : ODataController
  {
    private readonly IndicesDbContext context;
    public TeacherController(IndicesDbContext context)
    {
      this.context = context;
    }

    [EnableQuery]
    public IActionResult Get()
    {
      return Ok(context.Teachers);
    }

    [EnableQuery]
    public IActionResult Get(string key)
    {
      return Ok(context.Teachers.FirstOrDefault(c => c.Teacher == key));
    }
  }
}
