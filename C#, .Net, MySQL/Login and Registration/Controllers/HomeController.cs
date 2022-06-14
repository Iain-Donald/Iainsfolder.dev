
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Linq;
using LogAndReg3.Models;
// Other using statements
namespace LogAndReg3.Controllers
{
    public class HomeController : Controller {
        private MyContext _context;
        public HomeController(MyContext context) {
            _context = context;
        }
    
        [HttpGet("")]
        public IActionResult Index() {
            if (HttpContext.Session.GetString("logged_in") == null) return RedirectToAction("LoginReg");
            ViewBag.Name = HttpContext.Session.GetString("logged_in");
            return View();
        }

        [HttpGet("login")]
        public IActionResult LoginReg() {
            if (HttpContext.Session.GetString("logged_in") != null) {
                return RedirectToAction("Index");
            }
            return View();
        }

        [HttpPost("register")]
        public IActionResult Register(User user) {
            if (_context.users.Any(u => u.email == user.email)) {
                ModelState.AddModelError("Email", "Email already in use!");
                return View("LoginReg");
            }
            PasswordHasher<User> hasher = new PasswordHasher<User>();

            user.password = hasher.HashPassword(user, user.password);
            _context.users.Add(user);
            _context.SaveChanges();
            HttpContext.Session.SetString("logged_in", user.firstName);
            return View("LoginReg");
        }

        [HttpPost("confirmlogin")]
        public IActionResult Login(LoginUser userSubmission) {
            if (ModelState.IsValid) {
                var userInDb = _context.users.FirstOrDefault(u => u.email == userSubmission.email);
                if (userInDb == null) {
                    ModelState.AddModelError("Email", "Invalid Email/Password");
                    return View("LoginReg");
                }
                var hasher = new PasswordHasher<LoginUser>();
                var result = hasher.VerifyHashedPassword(userSubmission, userInDb.password, userSubmission.password);

                if (result == 0) return View("LoginReg");
                else {
                    HttpContext.Session.SetString("logged_in", userInDb.firstName);
                    return RedirectToAction("Index");
                }
            }
            return View("LoginReg");
        }

        [HttpGet("logout")]
        public IActionResult Logout() {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }
    }
}