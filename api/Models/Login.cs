using Newtonsoft.Json;

namespace DistributedSPA.API.Models {
    public class Login {
        [JsonProperty("Username")]
        public string Username {
            get;
            set;
        }

        [JsonProperty("Password")]
        public string Password {
            get;
            set;
        }
    }
}