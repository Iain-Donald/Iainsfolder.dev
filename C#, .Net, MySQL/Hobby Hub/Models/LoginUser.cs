using System;
using System.ComponentModel.DataAnnotations;

namespace HobbyHub3.Models
{
    public class LoginUser
    {
        [Required]
        [Display(Name="Username")]
        public string LoginUsername { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        [Display(Name="Password")]
        public string LoginPassword { get; set; }
    }

}