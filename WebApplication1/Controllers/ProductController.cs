using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class ProductController : ApiController
    {
        DatabaseController db = new DatabaseController();
        ProductDBController productDBcontroller = new ProductDBController();
        // GET: api/Product
        public IEnumerable<Product> Get()
        {
            List<Product> products = productDBcontroller.products;
            return products;
        }

        // GET: api/Product/5
        public IHttpActionResult Get(int id)
        {
            Product product = productDBcontroller.products.FirstOrDefault(p => p.Product_id == id);
            if (product != null)
            {
                return Ok(product);
            }
            else
            {
                return NotFound();
            }
        }

        // POST: api/Product
        public void Post(Product product)
        {
            if (ModelState.IsValid)
            {
                productDBcontroller.CreateProduct(product);
            }
        }

        // PUT: api/Product/5
        public void Put(int id, Product product)
        {
            if (ModelState.IsValid)
            {
                productDBcontroller.UpdateProduct(product);
            }
        }

        // DELETE: api/Product/5
        public void Delete(int id)
        {
            if (ProductExists(id))
            {
                productDBcontroller.DeleteProduct(id);
            }
            else { }
        }
        private bool ProductExists(int id)
        {
            bool exists = productDBcontroller.products.Exists(p => p.Product_id == id);
            return exists;
        }
    }
}
