
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DistributedSPA.IdentityServer {
    public class ConsentDetails {
        [JsonProperty("ClientName")]
        public string ClientName;

        [JsonProperty("IdentityScopes")]
        public List<ScopeDetails> IdentityScopes;

        [JsonProperty("ApiScopes")]
        public List<ScopeDetails> ApiScopes;
    }
}