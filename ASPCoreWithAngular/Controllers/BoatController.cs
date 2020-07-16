using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPCoreWithAngular.Interfaces;
using ASPCoreWithAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace ASPCoreWithAngular.Controllers
{
    [Route("api/[controller]")]
    public class BoatController : Controller
    {
        private readonly IBoat objboat;

        public BoatController(IBoat _objboat)
        {
            objboat = _objboat;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("Create")]
        public int Create([FromBody] BoatDetails boatObj)
        {
            return objboat.AddBoat(boatObj);
        }

        [HttpGet]
        [Route("GetBoatList")]
        public IEnumerable<int> GetList()
        {
            return objboat.GetBoats();
        }

        [HttpGet]
        [Route("getReturnBoatList")]
        public IEnumerable<int> GetReturnBoatList()
        {
            return objboat.GetReturnBoats();
        }

        

        [HttpPut]
        [Route("RentBoat/{boatno}/{custname}")]
        public int EditBoat([FromRoute]int boatno, [FromRoute] string custname)
        {
            return objboat.UpdateBoatRecord(boatno, custname);
        }

        [HttpPut]
        [Route("ReturnBoat/{boatno}")]
        public ApiReturnObj ReturBoat([FromRoute] int boatno)
        {
            return objboat.ReturnBoat(boatno);
        }

        [HttpDelete]
        [Route("DeleteBoat/{id}")]
        public int Delete(int id)
        {
            return objboat.DeregisterBoat(id);
        }
    }
}
