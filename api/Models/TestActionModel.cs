using Newtonsoft.Json;

namespace DistributedSPA.API.Models
{
    public class TestActionModel
    {
        [JsonProperty("Property1")]
        public string Property1
        {
            get;
            set;
        }

        [JsonProperty("Property2")]
        public int Property2
        {
            get;
            set;
        }
    }
}