using WebApplication1.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class CategoryDBController : DatabaseController
    {
        public List<Category> categories = new List<Category>();

        public CategoryDBController()
        {
            categories = GetAllCategoriesFromDB();
        }
        
        
        public List<Category> GetAllCategoriesFromDB()
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string selectAllProductsQuery = @"SELECT * FROM category ORDER BY name";
                MySqlCommand cmd = new MySqlCommand(selectAllProductsQuery, connection);
                cmd.Prepare();
                List<Category> categories = new List<Category>();
                using (MySqlDataReader dataReader = cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Category category = new Category();
                        category.Category_id = dataReader.GetInt16("category_id");
                        category.Name = dataReader.GetString("name");
                        categories.Add(category);
                    }
                }
                return categories;
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
        public Category GetCategoryFromDB(int category_id)
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string selectAllProductsQuery = @"SELECT * FROM category ORDER BY name";
                MySqlCommand cmd = new MySqlCommand(selectAllProductsQuery, connection);
                cmd.Prepare();
                Category category = new Category();
                using (MySqlDataReader dataReader = cmd.ExecuteReader())
                {
                    if (dataReader.Read())
                    {
                        category.Category_id = dataReader.GetInt16("category_id");
                        category.Name = dataReader.GetString("name");
                    }
                }
                return category;
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
        public void CreateCategory(Category category)
        {
            MySqlTransaction trans = null;
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                trans = Connection.BeginTransaction();
                string createProductquery = @"insert into category values(category_id, @name)";
                MySqlCommand cmd = new MySqlCommand(createProductquery, connection);
                MySqlParameter nameParam = new MySqlParameter("@name", MySqlDbType.VarChar);

                nameParam.Value = category.Name;

                cmd.Parameters.Add(nameParam);

                cmd.ExecuteNonQuery();
                trans.Commit();
            }
            catch (Exception e)
            {
                trans.Rollback();
                Console.Write("Category not created: " + e);
                throw e;
            }
            finally
            {
                Connection.Close();
            }
        }
    }
}