using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Controllers;

namespace WebApplication1.Models
{
    public class UserDBController : DatabaseController
    {
        public List<User> users = new List<User>();
        public UserDBController()
        {
            users = GetAllUsersFromDatabase();
        }
        public List<User> GetAllUsersFromDatabase()
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string selectQueryAllUsers = @"SELECT * FROM user ORDER BY user_id DESC";
                MySqlCommand cmd = new MySqlCommand(selectQueryAllUsers, connection);
                cmd.Prepare();
                List<User> users = new List<User>();
                using (MySqlDataReader dataReader = cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        User user = new User();
                        user.UserID = dataReader.GetInt16("user_id");
                        user.Email = dataReader.GetString("email");
                        user.Password  = dataReader.GetString("password");
                        user.Username = dataReader.GetString("username");
                        users.Add(user);
                    }
                }
                return users;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
            finally
            {
                Connection.Close();
            }
        }
        public bool isAuthorized(string email, string password)
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string selectQueryUser = @"SELECT email,password FROM user WHERE email = @email AND password = @password";
                MySqlCommand cmd = new MySqlCommand(selectQueryUser, connection);
                MySqlParameter emailParam = new MySqlParameter("@email", MySqlDbType.VarChar);
                MySqlParameter passwordParam = new MySqlParameter("@password", MySqlDbType.VarChar);
                emailParam.Value = email;
                passwordParam.Value = password;
                cmd.Parameters.Add(emailParam);
                cmd.Parameters.Add(passwordParam);
                cmd.Prepare();
                using (MySqlDataReader dataReader = cmd.ExecuteReader())
                {
                    return dataReader.Read();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
            finally
            {
                Connection.Close();
            }
        }
        public void CreateUser(User user)
        {
            MySqlTransaction trans = null;
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                trans = Connection.BeginTransaction();
                string createuserquery = @"insert into user values(user_id, @username, @email, @password,0)";
                MySqlCommand cmd = new MySqlCommand(createuserquery, connection);
                MySqlParameter usernameParam = new MySqlParameter("@username", MySqlDbType.VarChar);
                MySqlParameter passwordParam = new MySqlParameter("@password", MySqlDbType.VarChar);
                MySqlParameter emailParam = new MySqlParameter("@email", MySqlDbType.VarChar);
                

                usernameParam.Value = user.Username;
                passwordParam.Value = user.Password;
                emailParam.Value = user.Email;

                cmd.Parameters.Add(usernameParam);
                cmd.Parameters.Add(passwordParam);
                cmd.Parameters.Add(emailParam);
                cmd.ExecuteNonQuery();
                trans.Commit();
            }
            catch (Exception e)
            {
                trans.Rollback();
                Console.Write("User not created: " + e);
                throw e;
            }
            finally
            {
                Connection.Close();
            }
        }
    }
}