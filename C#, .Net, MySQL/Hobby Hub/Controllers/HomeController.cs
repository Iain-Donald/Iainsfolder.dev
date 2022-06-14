using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using HobbyHub3.Models;


namespace HobbyHub3.Controllers
{
    public class HomeController : Controller
    {
        private HobbiesContext _context;
        public HomeController(HobbiesContext context)
        {
            _context = context;
        }
        [HttpGet("")]
        public IActionResult Index()
        {
            return RedirectToAction("Hobbies");
        }

        [HttpGet("login")]
        public IActionResult LoginReg()
        {
            int? userId = HttpContext.Session.GetInt32("logged_in_id");
            if (userId != null) return RedirectToAction("Hobbies");

            return View();
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            if (ModelState.IsValid)
            {
                if (_context.Users.Any(u => u.Username == user.Username))
                {
                    ModelState.AddModelError("Username", "Username already in use!");
                    return View("LoginReg");
                }
                PasswordHasher<User> hasher = new PasswordHasher<User>();

                user.Password = hasher.HashPassword(user, user.Password);
                _context.Users.Add(user);
                _context.SaveChanges();
                HttpContext.Session.SetInt32("logged_in_id", user.UserId);
                return RedirectToAction("Hobbies");
            }
            return View("LoginReg");
        }

        [HttpPost("confirmlogin")]
        public IActionResult Login(LoginUser userSubmission)
        {
            if (ModelState.IsValid)
            {
                var userInDb = _context.Users.FirstOrDefault(u => u.Username == userSubmission.LoginUsername);
                if (userInDb is null)
                {
                    ModelState.AddModelError("LoginUsername", "Invalid Username/Password");
                    return View("LoginReg");
                }

                var hasher = new PasswordHasher<LoginUser>();

                var result = hasher.VerifyHashedPassword(userSubmission, userInDb.Password, userSubmission.LoginPassword);

                if (result == 0)
                {
                    return View("LoginReg");
                }
                else
                {
                    HttpContext.Session.SetInt32("logged_in_id", userInDb.UserId);
                    return RedirectToAction("Hobbies");
                }
            }
            return View("LoginReg");
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Hobbies");
        }

        [HttpGet("home")]
        public IActionResult Hobbies()
        {
            int? userId = HttpContext.Session.GetInt32("logged_in_id");
            if (userId is null) return RedirectToAction("LoginReg");

            var Hobbies = _context.Hobbies.ToList();
            Dashboard dash = new Dashboard();
            dash.Hobbies = _context.Hobbies
                .Include(a => a.UsersJoined)
                    .ThenInclude(b => b.User)
                .ToList();
            dash.CurrentUser = _context.Users.FirstOrDefault(u => u.UserId == (int)userId);
            return View(dash);
        }

        [HttpGet("new")]
        public IActionResult NewHobby()
        {
            int? userId = HttpContext.Session.GetInt32("logged_in_id");
            if (userId is null) return RedirectToAction("LoginReg");

            return View();
        }

        [HttpPost("post_new_hobby")]
        public IActionResult PostNewHobby(Hobby hobby)
        {
            int? UserId = HttpContext.Session.GetInt32("logged_in_id");
            if (UserId is null) return RedirectToAction("LoginReg");

            if (ModelState.IsValid)
            {
                _context.Hobbies.Add(hobby);
                _context.SaveChanges();
                return RedirectToAction("Hobbies");
            }
            return View("NewHobby");
        }

        [HttpGet("hobby/{hobbyId}")]
        public IActionResult ViewHobby(int hobbyId)
        {
            int? userId = HttpContext.Session.GetInt32("logged_in_id");
            if (userId is null) return RedirectToAction("LoginReg");

            ViewBag.Name = _context.Users.FirstOrDefault(u => u.UserId == userId).FirstName;
            ViewBag.loggedInId = HttpContext.Session.GetInt32("logged_in_id");

            Hobby hobby = _context.Hobbies
                .Include(x => x.UsersJoined)
                    .ThenInclude(x => x.User)
                .FirstOrDefault(h => h.HobbyId == hobbyId);

            return View(hobby);
        }

        [HttpGet("hobby/{hobbyId}/join")]
        public IActionResult JoinHobby(int hobbyId)
        {
            int? userId = HttpContext.Session.GetInt32("logged_in_id");
            if (userId is null) return RedirectToAction("LoginReg");

            HobbyJoined newJoin = new HobbyJoined();
            newJoin.UserId = (int)userId;
            newJoin.HobbyId = hobbyId;
            _context.HobbiesJoined.Add(newJoin);
            _context.SaveChanges();

            return RedirectToAction("Hobbies");
        }

    }
}
