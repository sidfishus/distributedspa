﻿using System;
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
using DistributedSPA.Shared;

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
                .AddJsonFormatters()
                .AddAuthorization(options =>
                {
                    // Can only be used by users with an 'IsAdmin' claim
                    options.AddPolicy("IsAdmin", policy => policy.RequireClaim("IsAdmin"));
                });

            services
                .AddAuthentication("Bearer")
                .AddIdentityServerAuthentication(options =>
                {
                    // The URL to the identity server
                    options.Authority = URLs.IDENTITY_SERVER;
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
            // I.e. prevents this error: access to XMLHttpRequest at 'http://localhost:5010/TestAPI/TestAction' from
            // origin 'https://localhost:5001' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header
            // is present on the requested resource.
            app.UseCors(builder => {
                builder.AllowAnyOrigin();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            // For identity server
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
