
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using DistributedSPA.IdentityServer.Models;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Extensions;
using System.Linq;

namespace DistributedSPA.IdentityServer
{
    public class IdentityProfileService : IProfileService
    {

        private readonly IUserClaimsPrincipalFactory<AppUser> m_ClaimsFactory;
        private readonly UserManager<AppUser> m_UserManager;

        public IdentityProfileService(
            IUserClaimsPrincipalFactory<AppUser> claimsFactory,
            UserManager<AppUser> userManager)
        {
            m_ClaimsFactory = claimsFactory;
            m_UserManager = userManager;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await m_UserManager.FindByIdAsync(sub);
            if (user == null)
            {
                throw new System.ArgumentException("");
            }

            var principal = await m_ClaimsFactory.CreateAsync(user);
            var claims = principal.Claims.ToList();

            //claims.Add(new System.Security.Claims.Claim("UserName", user.UserName));

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await m_UserManager.FindByIdAsync(sub);
            context.IsActive = user != null;
        }
    }
}