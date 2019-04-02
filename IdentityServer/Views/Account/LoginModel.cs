using Newtonsoft.Json;

namespace DistributedSPA.IdentityServer {
    public class LoginModel {
        [JsonProperty("username")]
        public string Username;

        [JsonProperty("password")]
        public string Password;

        [JsonProperty("returnUrl")]
        public string ReturnUrl;
    }
}