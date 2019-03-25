// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using IdentityServer4.Services;
using Microsoft.AspNetCore.SpaServices.Webpack;
using AspNetCore.Mvc.Routes.DebuggingLoggerMiddleware;

namespace DistributedSPA.IdentityServer
{
    public class Startup
    {
        public IHostingEnvironment Environment { get; }

        public Startup(IHostingEnvironment environment)
        {
            Environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // uncomment, if you wan to add an MVC-based UI
            services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1);

            var builder = services.AddIdentityServer()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApis())
                .AddInMemoryClients(Config.GetClients());

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