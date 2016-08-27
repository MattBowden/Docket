using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Docket.Models
{
    public class Task
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime? DateCompleted { get; set; }
        public string Note { get; set; }
        public int? UserId { get; set; }
        public byte[] Attachment { get; set; }
        public int TaskListId { get; set; }
        public int ParentTaskId { get; set; }

        public virtual User User { get; set; }
    }
}