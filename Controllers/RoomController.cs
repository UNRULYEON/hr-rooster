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
	public class RoomController : ODataController
  {
    private readonly IndicesDbContext context;
    public RoomController(IndicesDbContext context)
    {
      this.context = context;
    }

    [EnableQuery]
    public IActionResult Get()
    {
      return Ok(context.Rooms);
    }

    [EnableQuery]
    public IActionResult Get(string key)
    {
      return Ok(context.Rooms.FirstOrDefault(c => c.Room == key));
    }
  }
}
