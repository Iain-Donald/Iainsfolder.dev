using System.Collections.Generic;

namespace HobbyHub3.Models
{
    public class Dashboard
    {
        public User CurrentUser { get; set; }
        public List<Hobby> Hobbies { get; set; }
    }
}