using Docket.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Docket.Controllers
{
    public class TaskListController : Controller
    {
        private DocketContext db = new DocketContext();

        public ActionResult Index()
        {
            return View(db.TaskLists.ToList());
        }

        public ActionResult Tasks(int? id)
        {
            if (id != null)
            {
                Models.TaskList taskList = db.TaskLists.Find(id);
                if (taskList != null)
                {
                    return View(taskList);
                }
            }

            return RedirectToAction("Index");
        }
    }
}