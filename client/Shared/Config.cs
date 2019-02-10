

namespace DistributedSPA.Client
{
    public static class Config
    {
        public static void Initialise(
            Microsoft.Extensions.Configuration.IConfiguration config)
        {
            string ssrOnly=config["SSR_ONLY"];
            SSROnly=(ssrOnly!=null && ssrOnly!="0");
        }

        public static bool SSROnly
        {
            get;
            private set;
        }
    }
}