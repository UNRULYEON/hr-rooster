using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace playground.Controllers
{
	[Produces("application/json")]
	public class TodoController : ODataController
  {
    private readonly TodoContext context;
    public TodoController(TodoContext context)
    {
      this.context = context;
    }

    [EnableQuery]
    public IActionResult Get()
    {
      return Ok(context.TodoItems);
    }

    [EnableQuery]
    public IActionResult Get(int key)
    {
      return Ok(context.TodoItems.FirstOrDefault(c => c.Id == key));
    }

    [EnableQuery]
    public IActionResult Post([FromBody]TodoItem todo)
    {
      context.TodoItems.Add(todo);
      context.SaveChanges();
      return Created("1", todo);
    }
  }
}
