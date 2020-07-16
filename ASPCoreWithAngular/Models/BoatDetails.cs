using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Models
{
    public class BoatDetails
    {
        public int boatNumber { get; set; }

        public string boatName { get; set; }

        public string boatImage { get; set; }

        public double hourlyRate { get; set; }

        public string IsAvailable { get; set; }
    }
}
