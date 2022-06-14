using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HobbyHub3.Models
{
    public class Hobby
    {
        public int HobbyId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public List<HobbyJoined> UsersJoined { get; set; }
    }
}