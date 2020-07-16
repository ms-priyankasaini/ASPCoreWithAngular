using ASPCoreWithAngular.Interfaces;
using ASPCoreWithAngular.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ASPCoreWithAngular.DataAccess
{
    public class BoatDataAccessLayer : IBoat
    {
        private string connectionString;
        public BoatDataAccessLayer(IConfiguration configuration)
        {
            connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        public int AddBoat(BoatDetails boatObj)
        {
            int boatno;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spAddBoat", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@boatName", boatObj.boatName);
                    cmd.Parameters.AddWithValue("@boatImage", boatObj.boatImage == null ? "" : boatObj.boatImage);
                    cmd.Parameters.AddWithValue("@hourlyRate", boatObj.hourlyRate);

                    SqlParameter outputIdParam = new SqlParameter("@boatnumber", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(outputIdParam);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();

                    boatno = Convert.ToInt32(outputIdParam.Value.ToString());
                }
                return boatno;
            }
            catch
            {
                throw;
            }
        }

        
        public List<int> GetBoats()
        {
            try
            {
                List<int> lstBoats = new List<int>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetBoatList", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        lstBoats.Add(Convert.ToInt32(rdr["boatNumber"]));
                    }
                    con.Close();
                }
                return lstBoats;
            }
            catch
            {
                throw;
            }
        }

        public List<int> GetReturnBoats()
        {
            try
            {
                List<int> lstBoats = new List<int>();

                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetReturnBoatList", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();

                    while (rdr.Read())
                    {
                        lstBoats.Add(Convert.ToInt32(rdr["boatNumber"]));
                    }
                    con.Close();
                }
                return lstBoats;
            }
            catch
            {
                throw;
            }
        }


        public int UpdateBoatRecord(int boatno, string custname)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateBoatRecord", con);
                    cmd.Parameters.AddWithValue("@boatNumber", boatno);
                    cmd.Parameters.AddWithValue("@custname", custname);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public ApiReturnObj ReturnBoat(int boatno)
        {
            decimal rentprice = 0;
            DateTime rentdate;

            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spReturnBoat", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    
                    cmd.Parameters.AddWithValue("@boatNumber", boatno);

                    SqlParameter price = new SqlParameter("@price", SqlDbType.Decimal)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(price);
                    
                    SqlParameter renttime = new SqlParameter("@renttime", SqlDbType.DateTime)
                    {
                        Direction = ParameterDirection.Output
                    };
                    cmd.Parameters.Add(renttime);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    
                    rentprice = Convert.ToDecimal(price.Value.ToString());
                    rentdate = Convert.ToDateTime(renttime.Value.ToString());
                    
                    con.Close();
                }
                return new ApiReturnObj (){price = rentprice, rentDate= rentdate };
            }
            catch
            {
                throw;
            }
        }

        public int DeregisterBoat(int boatno)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeregisterBoat", con);
                    cmd.Parameters.AddWithValue("@boatNumber", boatno);
                    cmd.CommandType = CommandType.StoredProcedure;

                    con.Open();
                    cmd.ExecuteNonQuery();


                    con.Close();
                }
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
