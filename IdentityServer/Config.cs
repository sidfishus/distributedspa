// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;
using IdentityServer4;

namespace DistributedSPA.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId()
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            var dspa=new ApiResource("DistributedSPA", "API for the Distributed SPA application.");
            // Set the scope to required so it's not possible to login without consent for it
            var scopeIter=dspa.Scopes.GetEnumerator();
            scopeIter.MoveNext();
            scopeIter.Current.Required=true;

            // The list of API's involved
            return new ApiResource[] {
                dspa,
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            // The list of client's involved
            return new Client[] {
                new Client
                {
                    ClientId = "DistributedSPAClient",
                    ClientName = "Distributed SPA",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,
                    AlwaysSendClientClaims = true,
                    AlwaysIncludeUserClaimsInIdToken = true,

                    //sidtodo current: refresh tokens?

                    // secret for authentication
                    /*
                    ClientSecrets =
                    {
                        //sidtodo - secret??
                        new Secret("secret".Sha256())
                    },
                    */

                    //sidtodo change hard coded URL's
                    RedirectUris =           { "http://localhost:5000/logincallback" },
                    PostLogoutRedirectUris = { "http://localhost:5000/login" },
                    AllowedCorsOrigins =     { "http://localhost:5000" },

                    // scopes that client has access to (the dedicated API for the client)
                    AllowedScopes = {
                        "DistributedSPA",
                        IdentityServerConstants.StandardScopes.OpenId
                    }
                }
            };
        }
    }
}