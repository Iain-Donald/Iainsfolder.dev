using System;
using System.ComponentModel.DataAnnotations;

namespace LogAndReg3.Models
{
    public class LoginUser
    {
        [Required]
        [EmailAddress]
        [Display(Name="email")]
        public string email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name="password")]
        public string password { get; set; }
    }

}