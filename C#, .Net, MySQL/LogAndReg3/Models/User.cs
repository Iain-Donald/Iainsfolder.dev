using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
    
//namespace LogAndReg3.Models
//{
    public class User
    {
        [Key]
        public int userID {get;set;}
        [Required]
        [Display(Name="First Name")]
        public string firstName {get;set;}
        [Required]
        [Display(Name="Last Name")]
        public string lastName {get;set;}
        
        [Required]
        [EmailAddress]
        public string email {get;set;}
        [DataType(DataType.Password)]
        [Required]
        [MinLength(8, ErrorMessage="Password must be 8 characters or longer!")]
        public string password {get;set;}
        public DateTime createdAt {get;set;} = DateTime.Now;
        public DateTime updatedAt {get;set;} = DateTime.Now;
        
        [NotMapped]
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string Confirm {get;set;}
    }    
//}