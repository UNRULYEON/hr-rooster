using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OData.Edm;
using hr_rooster.Models;

namespace hr_rooster
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<IndicesDbContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
      services.AddOData();
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      // app.UseHttpsRedirection();
      app.UseMvc(b =>
      {
        b.Select().Expand().Filter().OrderBy().MaxTop(500).Count();
        b.MapODataServiceRoute("odata", "odata", GetEdmModel());
				b.EnableDependencyInjection();
      });
    }

    private static IEdmModel GetEdmModel()
    {
      ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
      builder.EntitySet<Teachers>("Teacher");
      builder.EntitySet<Classes>("Class");
      builder.EntitySet<Rooms>("Room");
      return builder.GetEdmModel();
    }
  }
}
