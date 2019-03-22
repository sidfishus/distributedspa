using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using IdentityServer4.Services;
using IdentityServer4.AccessTokenValidation;

namespace DistributedSPA.API
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
            //// For identity server
            services
                .AddMvcCore()
                .AddAuthorization()
                .AddJsonFormatters();

            services
                .AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    // The URL to the identity server
                    //sidtodo change hard coded URL
                    options.Authority = "http://localhost:5099";
                    options.RequireHttpsMetadata = false;

                    options.ApiName = "DistributedSPA";
                });
            ////

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Enables the client app and API app to be on the same machine: requests can come from the same origin
            // I.e. prevents this error: ccess to XMLHttpRequest at 'http://localhost:5010/TestAPI/TestAction' from
            // origin 'https://localhost:5001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header
            // is present on the requested resource.
            app.UseCors(builder => {
                builder.AllowAnyOrigin();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            });

            //sidtodo try
            // services.AddCors(options =>
            // {
            //     // this defines a CORS policy called "default"
            //     options.AddPolicy("default", policy =>
            //     {
            //         policy.WithOrigins("http://localhost:5001")
            //             .AllowAnyHeader()
            //             .AllowAnyMethod();
            //     });
            // });

            // app.UseCors("default"); // inside Configure()

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            // For identity server
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
