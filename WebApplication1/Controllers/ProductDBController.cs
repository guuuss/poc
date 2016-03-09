using WebApplication1.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class ProductDBController : DatabaseController
    {
        public List<Product> products = new List<Product>();

        public ProductDBController()
        {
            products = GetAllProductsFromDatabase();
        }
        public void DeleteProduct(int product_id)
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string deleteForumQuery = @"DELETE FROM product WHERE product_id = @productid";
                MySqlCommand cmd = new MySqlCommand(deleteForumQuery, connection);
                MySqlParameter productidParam = new MySqlParameter("@productid", MySqlDbType.Int16);

                productidParam.Value = product_id;
                cmd.Parameters.Add(productidParam);
                cmd.ExecuteNonQuery();
            }
            catch (MySqlException e)
            {
                Console.Write(e);
            }
            finally
            {
                Connection.Close();
            }
        }
        public void UpdateProduct(Product product)
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string updatequery = @"update product Set name=@name, price=@price, brand=@brand WHERE product_id = @productid";
                MySqlCommand cmd = new MySqlCommand(updatequery, connection);
                MySqlParameter productidParam = new MySqlParameter("@productid", MySqlDbType.Int16);
                MySqlParameter nameParam = new MySqlParameter("@name", MySqlDbType.VarChar);
                MySqlParameter priceParam = new MySqlParameter("@price", MySqlDbType.Double);
                MySqlParameter brandParam = new MySqlParameter("@brand", MySqlDbType.VarChar);
                MySqlParameter quantityParam = new MySqlParameter("@quantity", MySqlDbType.Int16);

                productidParam.Value = product.Product_id;
                nameParam.Value = product.Name;
                priceParam.Value = product.Price;
                brandParam.Value = product.Brand;
                quantityParam.Value = product.Quantity;

                cmd.Parameters.Add(productidParam);
                cmd.Parameters.Add(quantityParam);
                cmd.Parameters.Add(nameParam);
                cmd.Parameters.Add(priceParam);
                cmd.Parameters.Add(brandParam);
                cmd.ExecuteNonQuery();
            }
            catch (MySqlException e)
            {
                Console.Write("Product not updatet: " + e);
                throw e;
            }
            finally
            {
                Connection.Close();
            }
        }
        public List<Product> GetAllProductsFromDatabase()
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string selectAllProductsQuery = @"SELECT * FROM product ORDER BY name";
                MySqlCommand cmd = new MySqlCommand(selectAllProductsQuery, connection);
                cmd.Prepare();
                List<Product> products = new List<Product>();
                using (MySqlDataReader dataReader = cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        Product product = new Product();
                        product.Product_id = dataReader.GetInt16("product_id");
                        product.Name = dataReader.GetString("name");
                        product.Brand = dataReader.GetString("brand");
                        product.Price = dataReader.GetDouble("price");
                        product.Quantity = dataReader.GetInt16("quantity");
                        products.Add(product);
                    }
                }
                return products;
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
        public Product GetProductFromDatabase(int product_id)
        {
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                string selectAllProductsQuery = @"SELECT * FROM product ORDER BY name";
                MySqlCommand cmd = new MySqlCommand(selectAllProductsQuery, connection);
                cmd.Prepare();
                Product product = new Product();
                using (MySqlDataReader dataReader = cmd.ExecuteReader())
                {
                    if (dataReader.Read())
                    {
                        product.Product_id = dataReader.GetInt16("product_id");
                        product.Name = dataReader.GetString("name");
                        product.Brand = dataReader.GetString("brand");
                        product.Price = dataReader.GetDouble("price");
                        product.Quantity = dataReader.GetInt16("quantity");
                        product.Category = dataReader.GetInt16("category");
                    }
                }
                return product;
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
        public void CreateProduct(Product product)
        {
            MySqlTransaction trans = null;
            try
            {
                MySqlConnection connection = Connection;
                connection.Open();
                trans = Connection.BeginTransaction();
                string createProductquery = @"insert into product values(product_id,@name,@brand, @price, @category, @quantity)";
                MySqlCommand cmd = new MySqlCommand(createProductquery, connection);
                MySqlParameter nameParam = new MySqlParameter("@name", MySqlDbType.VarChar);
                MySqlParameter brandParam = new MySqlParameter("@brand", MySqlDbType.VarChar);
                MySqlParameter priceParam = new MySqlParameter("@price", MySqlDbType.Double);
                MySqlParameter categoryParam = new MySqlParameter("@category", MySqlDbType.Int16);
                MySqlParameter quantityParam = new MySqlParameter("@quantity", MySqlDbType.Int16);

                nameParam.Value = product.Name;
                brandParam.Value = product.Brand;
                priceParam.Value = product.Price;
                categoryParam.Value = product.Category;
                quantityParam.Value = product.Quantity;

                cmd.Parameters.Add(nameParam);
                cmd.Parameters.Add(brandParam);
                cmd.Parameters.Add(priceParam);
                cmd.Parameters.Add(categoryParam);
                cmd.Parameters.Add(quantityParam);

                cmd.ExecuteNonQuery();
                trans.Commit();
            }
            catch (Exception e)
            {
                trans.Rollback();
                Console.Write("Product not created: " + e);
                throw e;
            }
            finally
            {
                Connection.Close();
            }
        }
    }
}