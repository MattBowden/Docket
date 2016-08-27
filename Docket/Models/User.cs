using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Docket.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        public DateTime? DateCreated { get; set; }
        public bool Blocked { get; set; }
        public bool Admin { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<TaskList> TaskLists { get; set; }
    }
}