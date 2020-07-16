using ASPCoreWithAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.Interfaces
{
    public interface IBoat
    {
        int AddBoat(BoatDetails boatObj);
        List<int> GetBoats();
        List<int> GetReturnBoats();
        int UpdateBoatRecord(int boatno ,string custname);
        ApiReturnObj ReturnBoat(int boatno);
        int DeregisterBoat(int boatno);
    }
}
