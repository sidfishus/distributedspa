
using Microsoft.Extensions.DependencyInjection;
using DistributedSPA.IdentityServer;
using DistributedSPA.IdentityServer.Data;
using Microsoft.EntityFrameworkCore;
using DistributedSPA.IdentityServer.Models;
using Microsoft.AspNetCore.Identity;
using System;
using IdentityModel;
using System.Security.Claims;
using System.Text;
using System.Linq;

// Before seeding the database, you have to run these 2 commands first.
// dotnet ef migrations add InitialCreate
// dotnet ef database update

namespace DistributedSPA.IdentityServer {
    public class SeedData {

        public static void Seed(string connectionString) {

            var services = new ServiceCollection();
            services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlite(connectionString));

            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            using (var serviceProvider = services.BuildServiceProvider())
            {
                using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetService<ApplicationDbContext>();

                    var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();

                    dbContext.Database.Migrate();

                    SeedUsers(dbContext,userMgr);
                }
            }
        }

        private static void SeedUsers(
            ApplicationDbContext dbContext,
            UserManager<AppUser> userMgr
        ) {         

            // The unique ID of the built in admin user
            const string ADMIN_ID="886E7ABE-D458-46D7-8E5B-AB6F02A48C78";

            Func<AppUser> GetAdminUser = () => userMgr.FindByIdAsync(ADMIN_ID).Result;
            var adminUser=GetAdminUser();
            if(adminUser==null)
            {
                // Generate the default admin password and store it in the database
                Header header=dbContext.GetOrCreateHeader();
                header.DefaultAdminPassword=$"{System.Guid.NewGuid().ToString()}aA!";
                
                // Create the admin user
                var adminUserCreate=new AppUser();
                adminUserCreate.Id=ADMIN_ID;
                adminUserCreate.UserName="Admin";
                var task=userMgr.CreateAsync(adminUserCreate,header.DefaultAdminPassword);
                if(!task.Result.Succeeded) {
                    var errorBuilder=new StringBuilder();
                    errorBuilder.Append("Failed to create the admin user, unable to start the application:");
                    foreach(var error in task.Result.Errors) {
                        errorBuilder.Append(
                            $"{Environment.NewLine}{error.Description}");
                    }
                    throw new Exception(errorBuilder.ToString());
                }
                // Save the default password
                dbContext.SaveChanges();

                adminUser=GetAdminUser();
                if(adminUser==null) {
                    throw new Exception("Failed to load the admin user after it was created.");
                }
            }

            // Create the administrator claim if it doesn't exist
            var claimsList= userMgr.GetClaimsAsync(adminUser).Result.Select(p=>p.Type);
            if (!claimsList.Contains("IsAdmin")) {
                userMgr.AddClaimAsync(adminUser,new Claim("IsAdmin","1"));  
            }
        }
    }
}