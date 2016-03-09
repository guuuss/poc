using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class DatabaseController
    {
        private MySqlConnection connection;
        public MySqlConnection Connection
        {
            get { return connection; }
            set { connection = value; }
        }

        public DatabaseController()
        {
            InstantiateConnection();
        }

        private void InstantiateConnection()
        {
            Connection = new MySqlConnection(WebConfigurationManager.ConnectionStrings["LocalMySqlServer"].ConnectionString);
        }
    }
}