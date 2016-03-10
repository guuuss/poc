using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class UserController : ApiController
    {
        UserDBController userDBcontroller = new UserDBController();
        // GET api/<controller>
        public IEnumerable<User> Get()
        {
            return userDBcontroller.users;
        }
        [Route("api/user/ValidateUser")]
        [HttpPost]
        public IHttpActionResult ValidateUser(User user)
        {
            if(ModelState.IsValid)
            {
                return HandleUserValidation(user);
            }
            else
            {
                return BadRequest();
            }
        }

        private IHttpActionResult HandleUserValidation(User user)
        {
            bool validUser = userDBcontroller.isAuthorized(user.Email, user.Password);
            if (validUser)
            {
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            User user = userDBcontroller.users.FirstOrDefault(u => u.UserID == id);
            if(user != null)
            {
                return Ok(user);
            }
            return NotFound();
        }

        // POST api/<controller>
        public void Post(User user)
        {
            if(ModelState.IsValid)
            {
                userDBcontroller.CreateUser(user);
            }
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