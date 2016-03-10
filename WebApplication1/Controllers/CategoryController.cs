using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CategoryController : ApiController
    {
        CategoryDBController categoryDBcontroller = new CategoryDBController();
        // GET api/<controller>
        [Route("api/category/")]
        public IEnumerable<Category> Get()
        {
            List<Category> categories = categoryDBcontroller.categories;
            return categories;
        }

        // GET api/<controller>/5
        [Route("api/category/{id}")]
        public IHttpActionResult Get(int id)
        {
            Category cat = categoryDBcontroller.categories.FirstOrDefault(c => c.Category_id == id);
            if (cat != null)
            {
                return Ok(cat);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<controller>
        public void Post(Category category)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}