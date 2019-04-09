using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Extensions;
using System.Linq;
using DistributedSPA.IdentityServer;

namespace DistributedSPA.IdentityServer {

    [Authorize]
    public class ConsentController : Controller {

        private readonly IIdentityServerInteractionService m_Interaction;
        private readonly IClientStore m_ClientStore;
        private readonly IResourceStore m_ResourceStore;

        public ConsentController(
            IIdentityServerInteractionService interaction,
            IClientStore clientStore,
            IResourceStore resourceStore
        ) {
            m_Interaction=interaction;
            m_ClientStore=clientStore;
            m_ResourceStore=resourceStore;
        }

        // Get consent from the user that they are happy for their details to be shared by the client
        public async Task<IActionResult> Index(string returnUrl)
        {
            //sidtodo here
            var request = await m_Interaction.GetAuthorizationContextAsync(returnUrl);
            if(request!=null) {
                // Get the client information
                var client = await m_ClientStore.FindEnabledClientByIdAsync(request.ClientId);
                if (client != null)
                {
                    // Get the list of scopes
                    var resources = await m_ResourceStore.FindEnabledResourcesByScopeAsync(request.ScopesRequested);
                    if(resources!=null) {

                        // Create the identity and API scope details
                        var identityScopes=resources.IdentityResources.Select(
                            resource => CreateScopeDetails(resource)).ToList();
                        var apiScopes=resources.ApiResources.SelectMany(resource => resource.Scopes).Select(
                            resource => CreateScopeDetails(resource)).ToList();

                        var details=new ConsentDetails {
                            ClientName=client.ClientName,
                            IdentityScopes=identityScopes,
                            ApiScopes=apiScopes
                        };

                        // Pass the identity scope details to the SPA
                        ViewData["Extra"]=details;

                        return View("../SPA");
                    }
                }
                else {
                    //sidtodo
                }
            } else {
                //sidtodo
            }
            return null;
        }

        private ScopeDetails CreateScopeDetails(
            IdentityResource resource
        ) {
            return new ScopeDetails {
                Name = resource.Name,
                DisplayName = resource.DisplayName,
                Description = resource.Description,
                Emphasize = resource.Emphasize,
                Required = resource.Required,
            };
        }

        private ScopeDetails CreateScopeDetails(
            Scope scope
        ) {
            return new ScopeDetails {
                Name = scope.Name,
                DisplayName = scope.DisplayName,
                Description = scope.Description,
                Emphasize = scope.Emphasize,
                Required = scope.Required,
            };
        }
    }
}