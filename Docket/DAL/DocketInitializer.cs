using Docket.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Docket.DAL
{
    public class DocketInitializer : DropCreateDatabaseIfModelChanges<DocketContext> 
    {
        protected override void Seed(DocketContext context)
        {
            var users = new List<User>
            {
                new User {Name="Bob Test", DateCreated=DateTime.Parse("2016-07-17"), Email="Bobtester@testters.com", Admin=true, Blocked=false },
                new User {Name="Paul Yust", DateCreated=DateTime.Parse("2016-06-17"), Email="eyeballpaul@testters.com", Admin=false, Blocked=false },
                new User {Name="Leon Fellow", DateCreated=DateTime.Parse("2016-07-16"), Email="Leontester@testters.com", Admin=false, Blocked=true },
                new User {Name="Lisa Viola", DateCreated=DateTime.Parse("2016-07-10"), Email="Lisattester@testters.com", Admin=false, Blocked=false },
                new User {Name="He Man", DateCreated=DateTime.Parse("2016-04-11"), Email="hemanttester@testers.com", Admin=false, Blocked=false }
            };

            users.ForEach(u => context.Users.Add(u));
            context.SaveChanges();

            var tasklists = new List<TaskList>
            {
                new TaskList {Name="To Do List 1", DateCreated=DateTime.Parse("2016-06-10"), DateModified=DateTime.Parse("2016-07-02"), UserId=1 },
                new TaskList {Name="To Do List 2", DateCreated=DateTime.Parse("2016-04-12"), DateModified=DateTime.Parse("2016-07-02"), UserId=2 },
                new TaskList {Name="To Do List the 3rd", DateCreated=DateTime.Parse("2016-07-11"), DateModified=DateTime.Parse("2016-07-02"), UserId=1 }
            };

            tasklists.ForEach(tl => context.TaskLists.Add(tl));
            context.SaveChanges();

            var tasks = new List<Task>
            {
                new Task {Name="Task name 1", DateCreated=DateTime.Parse("2016-06-10"), DateModified=DateTime.Parse("2016-06-10"), Note="Testing a note", UserId=1, TaskListId=1, ParentTaskId=0 },
                new Task {Name="Task name 2", DateCreated=DateTime.Parse("2016-06-11"), DateModified=DateTime.Parse("2016-06-11"), Note="Testing a longererererer note", UserId=1, TaskListId=1, ParentTaskId=0 },
                new Task {Name="Task name 3", DateCreated=DateTime.Parse("2016-06-12"), DateModified=DateTime.Parse("2016-06-14"), Note="Testing a note<br/>", UserId=1, TaskListId=1, ParentTaskId=1 },
                new Task {Name="Task name 3", DateCreated=DateTime.Parse("2016-06-12"), DateModified=DateTime.Parse("2016-06-15"), Note="Testing a sub note<br/>", UserId=1, TaskListId=1, ParentTaskId=1 },
                new Task {Name="Task namer", DateCreated=DateTime.Parse("2016-06-16"), DateModified=DateTime.Parse("2016-06-16"), Note="Testing a note", UserId=2, TaskListId=1, ParentTaskId=0 },
                new Task {Name="Task go name", DateCreated=DateTime.Parse("2016-07-11"), DateModified=DateTime.Parse("2016-06-11"), Note="Testing a note", UserId=2, TaskListId=2, ParentTaskId=0 },
                new Task {Name="Do this", DateCreated=DateTime.Parse("2016-07-10"), DateModified=DateTime.Parse("2016-06-10"), Note="Testing a note", UserId=1, TaskListId=1, ParentTaskId=1 },
                new Task {Name="Do that", DateCreated=DateTime.Parse("2016-07-10"), DateModified=DateTime.Parse("2016-06-10"), Note="Testing a note", UserId=2, TaskListId=2, ParentTaskId=0 },
                new Task {Name="Ummmmmmmmmmm task", DateCreated=DateTime.Parse("2016-07-11"), DateModified=DateTime.Parse("2016-06-11"), Note="Testing a note", UserId=1, TaskListId=1, ParentTaskId=0 }
            };

            tasks.ForEach(t => context.Tasks.Add(t));
            context.SaveChanges();

        }
    }
}