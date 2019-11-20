using Newtonsoft.Json;
using System.Collections.Generic;

namespace DistributedSPA.IdentityServer {
    public class PostConsentModel {
        [JsonProperty("IdentityScopes")]
        public List<ScopeDetails> IdentityScopes;

        [JsonProperty("ApiScopes")]
        public List<ScopeDetails> ApiScopes;

        [JsonProperty("ReturnUrl")]
        public string ReturnUrl;

        [JsonProperty("RememberConsent")]
        public bool RememberConsent;
    }
}