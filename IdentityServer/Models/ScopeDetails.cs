
using Newtonsoft.Json;

namespace DistributedSPA.IdentityServer {
    public class ScopeDetails {
        [JsonProperty("Name")]
        public string Name;

        [JsonProperty("DisplayName")]
        public string DisplayName;

        [JsonProperty("Description")]
        public string Description;

        [JsonProperty("Emphasize")]
        public bool Emphasize;

        [JsonProperty("Required")]
        public bool Required;

        [JsonProperty("Checked")]
        public bool Checked;
    }
}