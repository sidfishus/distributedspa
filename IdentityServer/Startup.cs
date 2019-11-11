// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

// See below for help regarding using ASP .NET Identity / EF with this
// http://docs.identityserver.io/en/latest/quickstarts/8_aspnet_identity.html


using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using IdentityServer4.Services;
using Microsoft.AspNetCore.SpaServices.Webpack;
using AspNetCore.Mvc.Routes.DebuggingLoggerMiddleware;
using DistributedSPA.IdentityServer.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using DistributedSPA.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;


namespace DistributedSPA.IdentityServer
{
    public class Startup
    {
        public IHostingEnvironment Environment { get; }

        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment environment,IConfiguration configuration)
        {
            Environment = environment;
            Configuration=configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("LiveConnection")));

            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc()
                .SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => options.SerializerSettings.TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects);

            var builder = services.AddIdentityServer(options => {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApis())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<AppUser>();

             // For debugging server side javascript via Node
            services.AddNodeServices(options =>
            {
                if (Environment.IsDevelopment())
                {
                    options.InvocationTimeoutMilliseconds=1000000;
                    options.LaunchWithDebugging = true;
                    //sidtodo change the port?
                    options.DebuggingPort = 9230;
                }
            });

            if (Environment.IsDevelopment())
            {
                builder.AddDeveloperSigningCredential();
            }
            else
            {
                throw new Exception("need to configure key material");
            }
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                 // 'npm install webpack-dev-middleware' is required for this
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    // See: https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.spaservices.webpack.webpackdevmiddlewareoptions.reacthotmodulereplacement?view=aspnetcore-2.2
                    // 'npm install --save-dev aspnet-webpack-react' is required for this
                    ReactHotModuleReplacement = true,
                    // Key - corresponds with the path in webpack module.exports output.publicPath
                    // 'npm install --save-dev aspnet-webpack' is required for this
                    HotModuleReplacementEndpoint = "/wwwroot/__webpack_hmr"
                });
                app.UseMiddleware<RouteDebuggingLogger>();
            }

            app.UseStaticFiles();

            app.UseIdentityServer();

            app.UseMvcWithDefaultRoute();

            // app.UseMvc(routes =>
            // {
            //     routes.MapRoute(
            //         name: "default",
            //         template: "{controller=Account}/{action=Login}/{id?}");

            //         //sidtodo

            //     // Replaces the 'URL rewrite' functionality in IIS
            //     // routes.MapSpaFallbackRoute(
            //     //     name: "spa-fallback",
            //     //     defaults: new { controller = "Home", action = "Index" });
            // });
        }
    }
}