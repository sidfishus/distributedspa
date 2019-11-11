using System.ComponentModel.DataAnnotations;

namespace DistributedSPA.IdentityServer.Models {
    
    // The purpose of this table is to hold and update values relating to the application at runtime
    // There will only ever be one record
    public class Header {
        [Key]
        public int RecordID {
            get;
            set;
        }
        
        // The purpose of this column is to hold the randomly generated default admin password used upon database
        // creation
        [StringLength(50)]
        public string DefaultAdminPassword
        {
            get;
            set;
        }
    }
}