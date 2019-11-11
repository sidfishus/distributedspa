

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DistributedSPA.IdentityServer.Models;
using System;

namespace DistributedSPA.IdentityServer.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {

        enum Enums
        {
            HeaderRecordId=1
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Header> Header { get; set; }

        // Don't forget to save afterwards
        public Header GetOrCreateHeader() {
            var header=Header.Find(Convert.ToInt32(Enums.HeaderRecordId));
            if(header==null) {
                header=new Header {
                    RecordID = Convert.ToInt32(Enums.HeaderRecordId)
                };

                Add(header);
            }

            return header;
        }
    }
}
