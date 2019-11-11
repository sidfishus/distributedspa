using Newtonsoft.Json;

namespace DistributedSPA.IdentityServer.Models {
    public class Login {
        [JsonProperty("username")]
        public string Username {
            get;
            set;
        }

        [JsonProperty("password")]
        public string Password {
            get;
            set;
        }
    }
}