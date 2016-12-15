using Docket.DAL;
using Docket.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Docket.Controllers
{
    public class TaskController : Controller
    {
        private DocketContext db = new DocketContext();

        public int Add(int taskListId, int parentTaskId = 0)
        {
            Task task = new Task
            {
                Name = "Enter a task title",
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Note = "Enter a note",
                UserId = 1, //TODO: get current logged in user
                TaskListId = taskListId,
                ParentTaskId = parentTaskId
            };

            db.Tasks.Add(task);
            db.SaveChanges();

            return task.Id;
        }

        public void Update(int taskId, string taskTitle, string taskNote)
        {
            if (taskId != 0)
            {
                Task task = new Task();
                task = db.Tasks.Find(taskId);
                if (task != null)
                {
                    task.DateModified = DateTime.Now;
                    task.Name = taskTitle;
                    task.Note = taskNote;

                    db.SaveChanges();
                }
            }
        }

        public void Complete(List<int> taskIds)
        {
            if (taskIds.Count > 0)
            {
                var now = DateTime.Now;
                var tasksToComplete = db.Tasks.Where(t => taskIds.Contains(t.Id)).ToList();
                tasksToComplete.ForEach(t =>
                {
                    t.DateCompleted = now;
                    t.DateModified = now;
                });

                db.SaveChanges();
            }
        }

        public void Delete(List<int> taskIds)
        {
            if (taskIds.Count > 0)
            {
                db.Tasks.RemoveRange(db.Tasks.Where(t => taskIds.Contains(t.Id)));
                db.SaveChanges();
            }
        }
    }
}